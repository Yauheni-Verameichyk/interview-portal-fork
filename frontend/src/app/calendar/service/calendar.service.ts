import { Injectable } from '@angular/core';
import {
  getMonth,
  subDays,
  startOfMonth,
  startOfWeek,
  startOfDay,
  endOfMonth,
  endOfWeek,
  endOfDay
} from 'date-fns';
import RRule = require('rrule');
import { SpecifiedTimeDTO } from '../../api/models/specified-time-dto';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { Router } from '@angular/router';

@Injectable()
export class CalendarService {

  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    green: {
      primary: '#008000',
      secondary: '#ccffcc'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };

  startOfPeriod: any = {
    month: startOfMonth,
    week: startOfWeek,
    day: startOfDay
  };

  endOfPeriod: any = {
    month: endOfMonth,
    week: endOfWeek,
    day: endOfDay
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-pencil-alt"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log('Edited ' + event.id);
        this.router.navigate([{ outlets: { popup: ['calendar', 'edit', event.id] } }]);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log('Deleted ' + event.id);
      }
    }
  ];


  weekDays = [RRule.SU, RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA];

  constructor(private router: Router) { }

  addCalendarEventToArray(array: CalendarEvent[], event: CalendarEvent) {
    if (array.filter(listEvent => JSON.stringify(listEvent.start) === JSON.stringify(event.start)).length === 0) {
      array.push(event);
    }
  }

  getStartOfPeriod(view: string, viewDate: Date): string {
    return new Date(this.startOfPeriod[view](viewDate).getTime()
      - (this.startOfPeriod[view](viewDate).getTimezoneOffset() * 60000)).toISOString().slice(0, -5);
  }

  getEndOfPeriod(view: string, viewDate: Date): string {
    return new Date(this.endOfPeriod[view](viewDate).getTime()
      - (this.endOfPeriod[view](viewDate).getTimezoneOffset() * 60000)).toISOString().slice(0, -5);
  }

  generateStartTime(view: string, viewDate: Date, startTime: Date): Date {
    let date: Date;
    if (this.startOfPeriod[view](viewDate) > startTime) {
      date = this.startOfPeriod[view](viewDate);
      date.setHours(startTime.getHours());
      date.setDate(date.getDate() - 7);
    } else {
      date = startTime;
    }
    return date;
  }

  generateEndTime(view: string, viewDate: Date, endTime: Date): Date {
    return this.endOfPeriod[view](viewDate) > endTime
      ? endTime : this.endOfPeriod[view](viewDate);
  }

  generateRecurringEvent(specifiedTime: SpecifiedTimeDTO): RecurringEvent {
    const startTime = new Date(specifiedTime.startTime);
    const endTime = new Date(specifiedTime.endTime);
    return {
      id: specifiedTime.id,
      title: startTime.getHours().toString() + ':' + startTime.getMinutes().toString() + 0 + ' - '
        + (startTime.getHours() + 1).toString() + ':' + startTime.getMinutes().toString() + 0,
      color: this.colors.green,
      startTime: startTime,
      endTime: endTime,
      rrule: this.generateRepeatRule(specifiedTime),
    };
  }

  generateNonRepeatableEvent(specifiedTime: SpecifiedTimeDTO): CalendarEvent {
    const startTime = new Date(specifiedTime.startTime);
    const endTime = new Date(specifiedTime.endTime);
    return {
      id: specifiedTime.id,
      title: startTime.getHours().toString() + ':' + startTime.getMinutes().toString() + 0 + ' - '
        + (startTime.getHours() + 1).toString() + ':' + startTime.getMinutes().toString() + 0,
      start: startTime,
      end: endTime,
      color: this.colors.green,
      actions: this.actions,
      meta: { incrementsBadgeTotal: false }
    };
  }

  generateRepeatRule(specifiedTime: SpecifiedTimeDTO): RecurringEvent['rrule'] {
    const startTime = new Date(specifiedTime.startTime);
    if (specifiedTime.repeatInterval.match(/\d+Y/)) {
      return this.generateYearlyRule(startTime);
    }
    if (specifiedTime.repeatInterval.match(/\d+M/)) {
      return this.generateMonthlyRule(startTime);
    }
    if (specifiedTime.repeatInterval.match(/\d+D/)) {
      return this.generateWeeklyRule(startTime);
    }
    throw new Error('Unknown period');
  }

  generateYearlyRule(startTime: Date): RecurringEvent['rrule'] {
    return {
      freq: RRule.YEARLY,
      bymonth: startTime.getMonth() + 1,
      bymonthday: startTime.getDate()
    };
  }

  generateMonthlyRule(startTime: Date): RecurringEvent['rrule'] {
    return {
      freq: RRule.MONTHLY,
      bymonthday: startTime.getDate()
    };
  }

  generateWeeklyRule(startTime: Date): RecurringEvent['rrule'] {
    return {
      freq: RRule.WEEKLY,
      byweekday: [this.weekDays[startTime.getDay()]]
    };
  }

  generateRequestParamsForEventsForUser(view: string, viewDate: Date) {
    return {
      rangeStart: this.getStartOfPeriod(view, viewDate),
      rangeEnd: this.getEndOfPeriod(view, viewDate)
    };
  }

  createRRule(view: string, viewDate: Date, event: RecurringEvent) {
    return new RRule(
      Object.assign({}, event.rrule, {
        dtstart: this.generateStartTime(view, viewDate, event.startTime),
        until: this.generateEndTime(view, viewDate, event.endTime)
      })
    );
  }

  convertDateToString(date: Date) {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, -5);
  }

  sortCalendarEvents(calendarEvents: CalendarEvent[]): void {
    calendarEvents.sort(function (a, b) {
      if (a.start > b.start) { return 1 } if (a.start < b.start) { return -1 } return 0
    })
  }
}
