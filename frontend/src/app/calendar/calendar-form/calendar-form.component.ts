import { Component, OnInit } from '@angular/core';
import { SpecifiedTimeDTO } from '../../api/models/specified-time-dto';
import { SpecifiedTime } from '../../api/models/specified-time';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.css']
})
export class CalendarFormComponent implements OnInit {

  specifiedTimeDTO: SpecifiedTimeDTO;
  specifiedTime: SpecifiedTime = new SpecifiedTime();

  isRepeatable = false;
  repeatPattern: string;
  refresh: Subject<any> = new Subject();

  constructor() { }

  ngOnInit() {
    this.specifiedTime.startTime = new Date();
    this.specifiedTime.endTime = new Date();
    this.specifiedTime.startTime.setMinutes(0);
    this.specifiedTime.endTime.setMinutes(0);
    this.specifiedTime.startTime.setSeconds(0);
    this.specifiedTime.endTime.setSeconds(0);
    this.specifiedTime.duration = 1;
  }

  sendSpecifiedTime() {
    console.log(this.isRepeatable);
    console.log(this.specifiedTime);
    console.log(this.repeatPattern);
  }
}
