import { Injectable } from '@angular/core';
import { Candidate } from '../../../api/models/candidate';
import { ActivatedRoute, Router } from '@angular/router';
import { DisciplineDTO } from '../../../api/models';
import { EducationCandidate } from '../../../api/models/education-candidate';
import { WorkCandidate } from '../../../api/models/work-candidate';
import { FormGroup, FormBuilder, ValidatorFn, Validators, FormArray } from '@angular/forms';
import { FormValidatorService } from '../../../shared/validator/validator-form/form-validator.service';
import { LightFieldService } from '../../../shared/validator/service/light-field.service';
import { CandidateControllerService } from '../../../api/services/candidate-controller.service';
import { Subject } from 'rxjs';
import { CandidateService } from '../../service/candidate.service';
import { PopupService } from '../../../shared/pop-up-window/popup-service/popup.service';

@Injectable()
export class CandidateFormService {

  public candidateForm: FormGroup;
  public candidate: Candidate = new Candidate();
  public displayErrorMessage: boolean = false;
  private operation: string = '';

  private readonly emptyCandidate: Candidate = {
    disciplineList: [new DisciplineDTO()],
    educationCandidateList: [new EducationCandidate()],
    workCandidateList: [new WorkCandidate()]
  }

  private readonly CANDIDATE_FORM_CONFIG = {
    'candidate-create': {
      initMethod: () => this.candidateForm.enable(),
      formTitle: 'Add candidate',
      saveMethod: (candidate) => this.candidateControllerService.addUsingPOST(candidate),
      successfullySaveMessage: "Candidate was successfully created !!!",
      notSuccessfullySaveMessage: "Could not create candidate! Try later!"
    },
    'candidate-view': {
      initMethod: () => this.candidateForm.disable(),
      formTitle: 'View candidate'
    },
    'candidate-update': {
      initMethod: () => this.candidateForm.enable(),
      formTitle: 'Edit candidate',
      saveMethod: (candidate) => this.candidateControllerService.updateUsingPUT(candidate),
      successfullySaveMessage: "Candidate was successfully updated !!!",
      notSuccessfullySaveMessage: "Could not update candidate! Try later!"
    }
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private formValidator: FormValidatorService,
    private lightFieldService: LightFieldService,
    private candidateControllerService: CandidateControllerService,
    private candidateService: CandidateService,
    private popupService: PopupService) { }

  get formTitle(): string {
    return this.CANDIDATE_FORM_CONFIG[this.operation].formTitle;
  }

  initCandidateForm(): void {
    this.candidate = this.route.snapshot.data['candidate'] || this.emptyCandidate;
    this.initFormGroup();
    this.route.snapshot.url.forEach(element => {
      if (this.CANDIDATE_FORM_CONFIG[element.path]) {
        this.CANDIDATE_FORM_CONFIG[element.path].initMethod();
        this.operation = element.path;
      }
    });
  }


  initFormGroup(): void {
    this.candidateForm = this.formBuilder.group({
      id: [this.candidate.id],
      name: [this.candidate.name, this.formValidator.lengthValidator()],
      surname: [this.candidate.surname, this.formValidator.lengthValidator()],
      phoneNumber: [this.candidate.phoneNumber, [Validators.required, this.formValidator.phoneValidator()]],
      workCandidateList: this.formBuilder.array(this.initWorkFormList()),
      educationCandidateList: this.formBuilder.array(this.initEducationFormList()),
      disciplineList: this.formBuilder.array(this.initDisciplineFormList())
    });
  }

  initWorkFormList(): FormGroup[] {
    const fromGroupList: FormGroup[] = [];
    this.candidate.workCandidateList.forEach((workCandidate: WorkCandidate) =>
      fromGroupList.push(this.initWorkForm(workCandidate)));
    return fromGroupList;
  }

  initWorkForm(workCandidate?: WorkCandidate): FormGroup {
    const work = !workCandidate ? new WorkCandidate() : workCandidate;
    return this.formBuilder.group({
      id: [work.id],
      companyName: [work.companyName, this.formValidator.lengthValidator()],
      position: [work.position, this.formValidator.lengthValidator()],
      startDate: [work.startDate, [Validators.required, this.formValidator.dateValidator()]],
      endDate: [work.endDate, [Validators.required, this.formValidator.dateValidator()]]
    });
  }

  initDisciplineFormList(): FormGroup[] {
    const formGroupList: FormGroup[] = [];
    this.candidate.disciplineList.forEach(discipline =>
      formGroupList.push(this.initDisciplineForm(discipline)));
    return formGroupList;
  }

  initDisciplineForm(discipline?: DisciplineDTO): FormGroup {
    const id: any = discipline ? discipline.id : null;
    return this.formBuilder.group({
      id: [id || '', Validators.required]
    });
  }

  initEducationFormList(): FormGroup[] {
    const fromGroupList: FormGroup[] = [];
    this.candidate.educationCandidateList.forEach((educationCandidate: EducationCandidate) =>
      fromGroupList.push(this.initEducationForm(educationCandidate)));
    return fromGroupList;
  }

  initEducationForm(educationCandidate?: EducationCandidate): FormGroup {
    const education = !educationCandidate ? new EducationCandidate() : educationCandidate;
    return this.formBuilder.group({
      id: [education.id],
      nameInstitution: [education.nameInstitution, this.formValidator.lengthValidator()],
      profession: [education.profession, this.formValidator.lengthValidator()],
      startDate: [education.startDate, [Validators.required, this.formValidator.dateValidator()]],
      endDate: [education.endDate, [Validators.required, this.formValidator.dateValidator()]]
    });
  }

  saveCandidate() {
    if (this.candidateForm.valid) {
      this.candidate = this.createObject(this.candidateForm);
      this.CANDIDATE_FORM_CONFIG[this.operation].saveMethod(this.candidate)
        .subscribe(body => {
          this.displayMessage(this.CANDIDATE_FORM_CONFIG[this.operation].successfullySaveMessage);
        }, (error: any) => {
          this.displayMessage(this.CANDIDATE_FORM_CONFIG[this.operation].notSuccessfullySaveMessage);
        });
    } else {
      this.displayErrorMessage = true;
      this.displayIncorrectField(this.candidateForm);
    }
  }

  displayMessage(message: string) {
    this.popupService.displayMessage(message, this.router);
    this.candidateService.updateCandidateList();
  }

  removeRow(index: number, title: string, candidateForm: FormGroup) {
    const control = <FormArray>candidateForm.controls[title];
    control.removeAt(index);
  }

  createObject(formGroup: FormGroup): Candidate {
    const candidate: Candidate = new Candidate();
    const controls = formGroup.controls;
    Object.keys(controls)
      .forEach(controlName => {
        candidate[controlName] = controls[controlName].value;
      });
    return candidate;
  }

  displayIncorrectField(formGroup: FormGroup): void {
    this.lightFieldService.lightField(formGroup.controls);
    this.lightFieldService.lightArray('educationCandidateList', formGroup);
    this.lightFieldService.lightArray('workCandidateList', formGroup);
    this.lightFieldService.lightArray('disciplineList', formGroup);
  }

}
