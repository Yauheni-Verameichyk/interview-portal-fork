import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTimeInterval } from '../../model/date-time-interval';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { InterviewDTO } from '../../../api/models/interview-dto';
import { FullInterviewInfoDTO } from '../../../api/models/full-interview-info-dto';
import { CandidateBaseInfoDTO } from '../../../api/models/candidate-base-info-dto';
import { CandidateControllerService } from '../../../api/services/candidate-controller.service';
import { DisciplineBaseInfoDTO } from '../../../api/models/discipline-base-info-dto';
import { DisciplineDTO } from '../../../api/models/discipline-dto';
import { UserBaseInfoDTO } from '../../../api/models/user-base-info-dto';
import { SpecifiedTimeControllerService } from '../../../api/services/specified-time-controller.service';
import { SpecifiedTimeDTO } from '../../../api/models/specified-time-dto';
import { element } from 'protractor';
import { InterviewControllerService } from '../../../api/services/interview-controller.service';
import { PopupService } from '../../../shared/pop-up-window/popup-service/popup.service';
import { LightFieldService } from '../../../shared/validator/service/light-field.service';

@Injectable()
export class InterviewFormService {

  public interview: FullInterviewInfoDTO = {
    candidate: new CandidateBaseInfoDTO(),
    disciplineSet: [new DisciplineBaseInfoDTO()],
    interviewerSet: [new UserBaseInfoDTO()]
  };
  public interval: DateTimeInterval = new DateTimeInterval();
  public interviewerList: Array<UserBaseInfoDTO>;
  public interviewForm: FormGroup;
  public isDisciplineDisplay: boolean = false;
  public isInterviewersDisplay: boolean = false;
  public isSaveButtonDisplay: boolean = false;
  private operation: string = '';

  private readonly INTERVIEW_FORM_CONFIG = {
    'interview-create': {
      formTitle: 'Add interview'
    },
    'interview-view': {
      formTitle: 'View interview'
    },
    'interview-update': {
      formTitle: 'Edit interview'
    }
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private specifiedTimeControllerService: SpecifiedTimeControllerService,
    private interviewControllerService: InterviewControllerService,
    private popupService: PopupService,
    private lightFieldService: LightFieldService) { }

  get formTitle(): string {
    return this.INTERVIEW_FORM_CONFIG[this.operation].formTitle;
  }

  initInterviewForm() {
    this.initFormGroup();
    this.route.snapshot.url.forEach(element => {
      if (this.INTERVIEW_FORM_CONFIG[element.path]) {
        this.operation = element.path;
      }
    });
  }

  initFormGroup() {
    this.interviewForm = this.formBuilder.group({
      place: [this.interview.place, Validators.required],
      candidate: this.formBuilder.group({
        id: this.interview.candidate.id || ''
      }),
      discipline: this.formBuilder.group({
        id: this.interview.disciplineSet[0].id || ''
      }),
      interviewerSet: this.formBuilder.array(this.initInterviewerFormList())
    });
  }

  initInterviewerFormList(): FormGroup[] {
    const formGroupList: FormGroup[] = [];
    this.interview.interviewerSet.forEach(interviewer =>
      formGroupList.push(this.initInterviewerForm(interviewer)));
    return formGroupList;
  }

  initInterviewerForm(interviewer?: UserBaseInfoDTO): FormGroup {
    const id: number = interviewer ? interviewer.id : null;
    return this.formBuilder.group({
      id: [id || '', Validators.required]
    });
  }

  showDiscipline() {
    this.refreshData();
    this.isDisciplineDisplay = true;
  }

  showInterviewers() {
    this.fetchInterviewerList();
  }

  showSaveButton() {
    if (!this.isSaveButtonDisplay) {
      this.isSaveButtonDisplay = true;
    }
  }

  fetchInterviewerList() {
    this.specifiedTimeControllerService
      .findAllInRangeUsingGET({
        disciplineId: this.interviewForm.controls.discipline.value.id,
        rangeEnd: this.interval.endStringDate,
        rangeStart: this.interval.startStringDate
      })
      .subscribe(specifiedTimeList => {
        this.fetchInterviewerListWithSpecifiedTime(specifiedTimeList);
        this.isInterviewersDisplay = true;
        if (!this.interviewerList.length) {
          this.isSaveButtonDisplay = false;
        }
      })
  }

  fetchInterviewerListWithSpecifiedTime(specifiedTimeList: SpecifiedTimeDTO[]) {
    this.interviewerList = new Array<UserBaseInfoDTO>();
    specifiedTimeList.forEach(specifiedTimeDTO => {
      let unique: number = 0;
      this.interviewerList.forEach(element => {
        if (element.id === specifiedTimeDTO.user.id) {
          unique++;
        }
      });
      if (!unique) {
        this.interviewerList.push(specifiedTimeDTO.user);
      }
    });
  }

  saveInterview() {
    if (this.interviewForm.valid) {
      let interview: FullInterviewInfoDTO = this.createObject();
      interview.startTime = this.interval.startStringDate;
      interview.endTime = this.interval.endStringDate;
      interview.disciplineSet = [interview.discipline];
      interview.status = "wait";
      this.interviewControllerService.addUsingPOST_1(interview)
        .subscribe(body => {
          this.popupService.displayMessage("Interview was successfully created!!!", this.router);
        }, (error: any) => {
          this.popupService.displayMessage("Could not create candidate! Try later!", this.router);
        });
    } else {
      this.lightFieldService.lightField(this.interviewForm.controls);
      this.lightFieldService.lightArray('interviewerSet', this.interviewForm);
    }
  }

  createObject(): FullInterviewInfoDTO {
    const interview: FullInterviewInfoDTO = new FullInterviewInfoDTO();
    const controls = this.interviewForm.controls;
    Object.keys(controls)
      .forEach(controlName => {
        interview[controlName] = controls[controlName].value;
      });
    return interview;
  }

  refreshData() {
    if (this.isInterviewersDisplay) {
      this.fetchInterviewerList();
    }
  }

  removeRow(index: number, title: string, interviewForm: FormGroup) {
    const control = <FormArray>interviewForm.controls[title];
    control.removeAt(index);
  }

}
