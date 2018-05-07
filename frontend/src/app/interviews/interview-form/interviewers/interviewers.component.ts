import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { UserBaseInfoDTO } from '../../../api/models/user-base-info-dto';
import { InterviewFormService } from '../service/interview-form.service';
import { element } from 'protractor';

@Component({
  selector: 'app-interviewers',
  templateUrl: './interviewers.component.html',
  styleUrls: ['./interviewers.component.css']
})
export class InterviewersComponent {

  @Input() interviewForm: FormGroup;
  @Input() interviewerList: Array<UserBaseInfoDTO>;
  @Input() isInterviewerView: boolean;
  public listOfInterviewersList: Array<Array<UserBaseInfoDTO>> = new Array<Array<UserBaseInfoDTO>>();

  readonly messageInterviewerNotSelected: string = "Interviewer not selected!!!";

  constructor(private interviewFormService: InterviewFormService) { }

  get isPlusButtonShow() {
    let arrayLength: number = this.interviewForm.controls['interviewerSet'].value.length;
    let isPlusButton: boolean = false;
    if (!this.isInterviewerView && (this.interviewerList.length !== arrayLength) && (this.interviewerList.length > 0)) {
      isPlusButton = true;
    }
    return isPlusButton;
  }

  fetchInterviewerList(count: number): Array<Array<UserBaseInfoDTO>> {
    let interviewers = this.interviewForm.controls['interviewerSet'].value;
    if (!this.listOfInterviewersList[count]) {
      this.listOfInterviewersList[count] = this.interviewerList;
    }
    if (!interviewers[count].id) {
      this.listOfInterviewersList[count] = this.fetchFreeInterviewers(interviewers);
    }
    let a: number = interviewers.length <= this.listOfInterviewersList.length ? interviewers.length : this.listOfInterviewersList.length;
    for (let i = 0; i < a; i++) {
      if(i != count) {
        let newFormInterviewers: Array<UserBaseInfoDTO> = new Array<UserBaseInfoDTO>();
        let formInterviewers: Array<UserBaseInfoDTO> = this.listOfInterviewersList[i];
        for (let j = 0; j < formInterviewers.length; j++) {
          if (interviewers[i].id == formInterviewers[j].id) {
            newFormInterviewers.push(formInterviewers[j]);
          }          
        }
        this.listOfInterviewersList[i] = newFormInterviewers;
      }
    }
    return this.listOfInterviewersList;
  }

  fetchFreeInterviewers(selectedInterviewers: Array<UserBaseInfoDTO>): Array<UserBaseInfoDTO> {
    return this.interviewerList.filter(interviewer => {
      return !selectedInterviewers.some(selectedInterviewer => interviewer.id == selectedInterviewer.id);
    });
  }

  additionInterviewer(): void {
    const control = <FormArray>this.interviewForm.controls['interviewerSet'];
    control.push(this.interviewFormService.initInterviewerForm());
  }

  remove(index: number, title: string) {
    this.interviewFormService.removeRow(index, title, this.interviewForm);
  }

}
