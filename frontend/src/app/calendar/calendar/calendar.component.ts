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

  public isLoaded = false;
  view = 'month';
  viewDate: Date = new Date();
  calendarEvents: CalendarEvent[] = [];
  activeDayIsOpen = false;
  private readonly destroy: Subject<void> = new Subject();
  constructor(
    private calendarService: CalendarService,
    private calendarControllerService: CalendarControllerService,
    private popupService: PopupService,
    private router: Router,
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
        (calendarDTO) => {
          console.log(calendarDTO);
          this.calendarEvents = this.calendarService.generateCalendarEvents(calendarDTO, this.view, this.viewDate);
          this.isLoaded = true;
        },
        (error) => {
          this.router.navigate(['error']);
          this.popupService.displayMessage('Error during time slots getting', this.router);
        });
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      day.badgeTotal = day.events.filter(
        (event) => event.meta.incrementsBadgeTotal,
      ).length;
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
