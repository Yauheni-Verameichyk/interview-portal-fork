import { Component, OnInit } from '@angular/core';
import { SpecifiedTimeDTO } from '../../api/models/specified-time-dto';
import { SpecifiedTime } from '../../api/models/specified-time';
import { Subject } from 'rxjs/Subject';
import { CalendarService } from '../service/calendar.service';
import { UserBaseInfoDTO } from '../../api/models/user-base-info-dto';
import { SpecifiedTimeControllerService } from '../../api/services/specified-time-controller.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.css']
})
export class CalendarFormComponent implements OnInit {

  specifiedTimeDTO: SpecifiedTimeDTO;
  specifiedTime: SpecifiedTime = new SpecifiedTime();

  isRepeatable: boolean;
  repeatPattern: string;
  refresh: Subject<any> = new Subject();

  repeatPeriod = {
    years: 0,
    months: 0,
    days: 0
  };

  constructor(
    private specifiedTimeControllerService: SpecifiedTimeControllerService,
    private calendarService: CalendarService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    if (+this.route.snapshot.paramMap.get('specifiedTimeId')) {
      
    }
    this.specifiedTime.startTime = new Date();
    this.specifiedTime.startTime.setMinutes(0);
    this.specifiedTime.startTime.setSeconds(0);
    this.specifiedTime.duration = 1;
  }

  sendSpecifiedTime() {
    if (this.specifiedTime.endTime <= this.specifiedTime.startTime) {
      throw new Error('End time is earlier than start time');
    }
    this.specifiedTimeDTO = {
      endTime: this.specifiedTime.endTime ? this.calendarService.convertDateToString(this.specifiedTime.endTime) : null,
      startTime: this.calendarService.convertDateToString(this.specifiedTime.startTime),
      id: this.specifiedTime.id,
      user: null,
      repeatInterval: this.isRepeatable ? this.generateRepeatInterval() : null,
      duration: this.specifiedTime.duration
    };
    this.specifiedTimeControllerService.saveUsingPOST_2(this.specifiedTimeDTO)
      .subscribe(response => { console.log('time slot was saved'); });
  }

  generateRepeatInterval() {
    switch (this.repeatPattern) {
      case 'yearly':
        return 'P1Y';
      case 'monthly':
        return 'P1M';
      case 'weekly':
        return 'P7D';
      case 'custom':
        return `P${this.repeatPeriod.years}Y${this.repeatPeriod.months}M${this.repeatPeriod.days}D`;
      default:
        throw new Error('Unknown repeat interval');
    }
  }
}
