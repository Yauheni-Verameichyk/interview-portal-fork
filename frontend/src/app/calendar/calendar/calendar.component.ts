import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import RRule = require('rrule');
import { Subject } from 'rxjs/Subject';
import { CalendarService } from '../service/calendar.service';
import { SpecifiedTimeControllerService } from '../../api/services/specified-time-controller.service';
import { SpecifiedTimeDTO } from '../../api/models/specified-time-dto';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { Router } from '@angular/router';
import { repeat } from 'rxjs/operators';
import { UserBaseInfoDTO } from '../../api/models/user-base-info-dto';
import { isSameMonth, isSameDay } from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  view = 'month';
  viewDate: Date = new Date();
  recurringEvents: RecurringEvent[] = [];
  unreccuringCalendarEvents: CalendarEvent[] = [];
  calendarEvents: CalendarEvent[] = [];

  activeDayIsOpen = true;
  constructor(
    private calendarService: CalendarService,
    private specifiedTimeControllerService: SpecifiedTimeControllerService,
    private popupService: PopupService,
    private router: Router, ) { }

  ngOnInit(): void {
    this.readAllEvents();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
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
    for (const timeSlot of timeSlots) {
      timeSlot.repeatInterval ? this.recurringEvents.push(this.calendarService.generateRecurringEvent(timeSlot))
        : this.calendarService.addCalendarEventToArray(this.unreccuringCalendarEvents,
          this.calendarService.generateNonRepeatableEvent(timeSlot));
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
        const calendarEvent = Object.assign({}, event, { start: new Date(date) },
          { actions: this.calendarService.actions },
          {
            meta: { incrementsBadgeTotal: false }
          });
        this.calendarService.addCalendarEventToArray(this.calendarEvents, calendarEvent);
      });
    });
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      day.badgeTotal = day.events.filter(
        event => event.meta.incrementsBadgeTotal
      ).length;
    });
  }
}
