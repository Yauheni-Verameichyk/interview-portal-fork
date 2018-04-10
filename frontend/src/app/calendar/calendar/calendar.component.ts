import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { Subject } from 'rxjs/Subject';
import { RRule } from 'rrule';
import { CalendarService } from '../service/calendar.service';
import { SpecifiedTimeControllerService } from '../../api/services/specified-time-controller.service';
import { SpecifiedTimeDTO } from '../../api/models/specified-time-dto';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { Router, NavigationEnd } from '@angular/router';
import { repeat } from 'rxjs/operators';
import { UserBaseInfoDTO } from '../../api/models/user-base-info-dto';
import { isSameMonth, isSameDay } from 'date-fns';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import 'rxjs/add/operator/takeUntil';
import { CalendarControllerService } from '../../api/services/calendar-controller.service';
import { ExcludedTimeSlot } from '../../api/models/excluded-time-slot';
import { CalendarDTO } from '../../api/models/calendar-dto';
import { RecurringEvent } from '../../api/models/recurring-event';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnDestroy {

  public isLoaded: boolean = false;
  view = 'month';
  viewDate: Date = new Date();
  recurringEvents: RecurringEvent[] = [];
  unreccuringCalendarEvents: CalendarEvent[] = [];
  calendarEvents: CalendarEvent[] = [];
  excludedTimeSlots: ExcludedTimeSlot[] = [];
  activeDayIsOpen = false;
  private readonly destroy: Subject<void> = new Subject();
  constructor(
    private calendarService: CalendarService,
    private specifiedTimeControllerService: SpecifiedTimeControllerService,
    private calendarControllerService: CalendarControllerService,
    private popupService: PopupService,
    private router: Router
  ) {
    this.router.events
      .takeUntil(this.destroy)
      .subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.readAllEvents();
        }
      });
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
    this.calendarControllerService.findAllForUserInRangeUsingGET(
      this.calendarService.generateRequestParamsForEventsForUser(this.view, this.viewDate))
      .takeUntil(this.destroy)
      .subscribe(
        calendarDTO => {
          this.processResponse(calendarDTO);
        },
        error => {
          this.router.navigate(['error']);
          this.popupService.displayMessage('Error during time slots getting', this.router);
        });
  }

  processResponse(calendarDTO: CalendarDTO): void {
    this.clearArrays();
    this.excludedTimeSlots = calendarDTO.excludedTimeSlots;
    for (const timeSlot of calendarDTO.specifiedTimeDTOs) {
      timeSlot.repeatInterval ? this.recurringEvents.push(this.calendarService.generateRecurringEvent(timeSlot))
        : this.calendarService.addCalendarEventToArray(this.unreccuringCalendarEvents,
          this.calendarService.generateNonRepeatableEvent(timeSlot), this.excludedTimeSlots);
    }
    this.addRecurringEventsToCalendarEvents();
    this.calendarService.addExcludedTimeSlotsToCalendarEvents(this.excludedTimeSlots, this.calendarEvents);
    this.calendarService.sortCalendarEvents(this.calendarEvents);
    this.isLoaded = true;
  }

  clearArrays() {
    this.excludedTimeSlots = [];
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
          { meta: { incrementsBadgeTotal: false, repeatable: true, groupId: event.meta.groupId } });
        this.calendarService.addCalendarEventToArray(this.calendarEvents, calendarEvent, this.excludedTimeSlots);
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

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
