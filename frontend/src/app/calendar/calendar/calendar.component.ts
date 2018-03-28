import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import {RRule} from 'rrule';
import { Subject } from 'rxjs';
import { CalendarService } from '../service/calendar.service';
import { SpecifiedTimeControllerService } from '../../api/services/specified-time-controller.service';
import { SpecifiedTimeDTO } from '../../api/models/specified-time-dto';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  view: string = 'month';
  viewDate: Date = new Date();
  recurringEvents: RecurringEvent[] = [];
  unreccuringCalendarEvents: CalendarEvent[] = [];
  calendarEvents: CalendarEvent[] = [];
  constructor(
    private calendarService: CalendarService,
    private specifiedTimeControllerService: SpecifiedTimeControllerService,
    private popupService: PopupService,
    private router: Router, ) { }

  ngOnInit(): void {
    this.readAllEvents();
  }

  readAllEvents(): void {
    this.specifiedTimeControllerService.findAllForUserInRangeUsingGET(
      this.calendarService.generateRequestParamsForEventsForUser(this.view, this.viewDate))
      .subscribe(
        timeSlots => {
          this.processResponce(timeSlots);
        },
        error => {
          this.popupService.displayMessage('Error during time slots getting', this.router);
        });
  }

  processResponce(timeSlots: SpecifiedTimeDTO[]): void {
    this.clearArrays();
    for (let i in timeSlots) {
      timeSlots[i].repeatInterval ? this.recurringEvents.push(this.calendarService.generateRecurringEvent(timeSlots[i]))
        : this.unreccuringCalendarEvents.push(this.calendarService.generateNonRepeatableEvent(timeSlots[i]));
    }
    this.addRecurringEventsToCalendarEvents();
  }

  clearArrays() {
    this.recurringEvents = [];
    this.calendarEvents = [];
    this.unreccuringCalendarEvents = [];
  }

  addRecurringEventsToCalendarEvents(): void {
    this.calendarEvents = this.calendarEvents.concat(this.unreccuringCalendarEvents);
    this.recurringEvents.forEach(event => {
      const rule: RRule = this.calendarService.createRRule(this.view, this.viewDate, event);
      rule.all().forEach(date => {
        this.calendarEvents.push(
          Object.assign({}, event, {
            start: new Date(date)
          })
        );
      });
    });
  }
}
