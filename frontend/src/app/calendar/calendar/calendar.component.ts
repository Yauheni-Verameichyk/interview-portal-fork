import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  getMonth,
  startOfMonth,
  startOfWeek,
  startOfDay,
  endOfMonth,
  endOfWeek,
  endOfDay
} from 'date-fns';
import { CalendarEvent } from 'angular-calendar';
import RRule = require('rrule');
import { Subject } from 'rxjs';
import { CalendarService } from '../service/calendar.service';

interface RecurringEvent {
  title: string;
  color: any;
  rrule?: {
    freq: RRule.Frequency;
    bymonth?: number;
    bymonthday?: number;
    byweekday?: RRule.Weekday[];
  };
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {


  refresh: Subject<any> = new Subject();

  view: string = 'month';

  viewDate: Date = new Date();

  recurringEvents: RecurringEvent[] = [
    {
      title: 'Recurs on the 5th of each month',
      color: this.calendarService.colors.yellow,
      rrule: {
        freq: RRule.MONTHLY,
        bymonthday: 5
      }
    },
    {
      title: 'Recurs yearly on the 10th of the current month',
      color: this.calendarService.colors.blue,
      rrule: {
        freq: RRule.YEARLY,
        bymonth: getMonth(new Date()) + 1,
        bymonthday: 10
      }
    },
    {
      title: 'Recurs weekly on mondays',
      color: this.calendarService.colors.red,
      rrule: {
        freq: RRule.WEEKLY,
        byweekday: [RRule.MO]
      }
    }
  ];

  constructor(private calendarService: CalendarService) { }

  calendarEvents: CalendarEvent[] = [];

  ngOnInit(): void {
    this.updateCalendarEvents();
  }

  updateCalendarEvents(): void {
    this.calendarEvents = [];

    const startOfPeriod: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    };

    const endOfPeriod: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    };

    this.recurringEvents.forEach(event => {
      const rule: RRule = new RRule(
        Object.assign({}, event.rrule, {
          dtstart: startOfPeriod[this.view](this.viewDate),
          until: endOfPeriod[this.view](this.viewDate)
        })
      );

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
