import { Component, OnInit, HostListener } from '@angular/core';
import { InterviewService } from '../service/interview.service';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css']
})
export class InterviewListComponent implements OnInit {

  constructor(public interviewService: InterviewService) { }

  ngOnInit() {
    this.interviewService.isLoaded = false;
    this.interviewService.showButtonLoad = true;
    this.interviewService.fetchInterviewList(0);
  }

  @HostListener("window:scroll", ["$event"])
  windowScrollListener(){
    const position = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if ((position === max) && this.interviewService.showButtonLoad) {
      this.interviewService.fetchInterviewList(this.interviewService.interviewList.length);
    }
  }

}
