import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { UserBaseInfoDTO } from '../../../api/models/user-base-info-dto';
import { InterviewFormService } from '../service/interview-form.service';

@Component({
  selector: 'app-interviewers',
  templateUrl: './interviewers.component.html',
  styleUrls: ['./interviewers.component.css']
})
export class InterviewersComponent {

  @Input() interviewForm: FormGroup;
  @Input() interviewerList: Array<UserBaseInfoDTO>;
  readonly messageInterviewerNotSelected: string = "Interviewer not selected!!!";

  constructor(private interviewFormService: InterviewFormService) { }

  additionInterviewer(): void {
    const control = <FormArray>this.interviewForm.controls['interviewerSet'];
    control.push(this.interviewFormService.initInterviewerForm());
  }

  remove(index: number, title: string) {
    this.interviewFormService.removeRow(index, title, this.interviewForm);
  }

}
