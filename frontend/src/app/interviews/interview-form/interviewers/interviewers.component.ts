import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserBaseInfoDTO } from '../../../api/models/user-base-info-dto';

@Component({
  selector: 'app-interviewers',
  templateUrl: './interviewers.component.html',
  styleUrls: ['./interviewers.component.css']
})
export class InterviewersComponent implements OnInit {

  @Input() interviewForm: FormGroup;
  @Input() interviewerList: Array<UserBaseInfoDTO>;

  constructor() { }

  ngOnInit() {
  }

}
