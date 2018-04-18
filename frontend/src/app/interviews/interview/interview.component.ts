import { Component, OnInit, Input } from '@angular/core';
import { InterviewDTO } from '../../api/models/interview-dto';
import { InterviewService } from '../service/interview.service';

@Component({
  selector: '[app-interview]',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent {

  @Input() interview: InterviewDTO;

  constructor(private interviewService: InterviewService) { }

  removeInterview(id: number) {
    this.interviewService.removeInterview(id);
  }

}
