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
import { CalendarEvent } from 'angular-calendar';

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

  weekDays = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA, RRule.SU];

  constructor() { }

  getStartOfPeriod(view: string, viewDate: Date): string {
    return this.startOfPeriod[view](viewDate).toISOString().slice(0, -5)
  }

  getEndOfPeriod(view: string, viewDate: Date): string {
    return this.endOfPeriod[view](viewDate).toISOString().slice(0, -5)
  }

  generateStartTime(view: string, viewDate: Date, startTime: Date) {
    return this.startOfPeriod[view](viewDate) > startTime
      ? this.startOfPeriod[view](viewDate) : startTime
  }

  generateEndTime(view: string, viewDate: Date, endTime: Date) {
    return this.endOfPeriod[view](viewDate) > endTime
      ? endTime : this.endOfPeriod[view](viewDate)
  }

  generateRecurringEvent(specifiedTime: SpecifiedTimeDTO): RecurringEvent {
    return {
      title: 'Empty slot ' + specifiedTime.id,
      color: this.colors.green,
      startTime: new Date(specifiedTime.startTime),
      endTime: new Date(specifiedTime.endTime),
      rrule: this.generateRepeatRule(specifiedTime)
    }
  }

  generateRepeatRule(specifiedTime: SpecifiedTimeDTO): RecurringEvent['rrule'] {
    let startTime = new Date(specifiedTime.startTime);
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
    }
  }

  generateMonthlyRule(startTime: Date): RecurringEvent['rrule'] {
    return {
      freq: RRule.MONTHLY,
      bymonthday: startTime.getDate()
    }
  }

  generateWeeklyRule(startTime: Date): RecurringEvent['rrule'] {
    return {
      freq: RRule.WEEKLY,
      byweekday: [this.weekDays[startTime.getDay() - 1]]
    }
  }

  generateNonRepeatableEvent(specifiedTime: SpecifiedTimeDTO): CalendarEvent {
    return {
      title: 'Empty slot ' + specifiedTime.id,
      start: new Date(specifiedTime.startTime),
      end: new Date(specifiedTime.endTime),
      color: this.colors.green
    }
  }

  generateRequestParamsForEventsForUser(view: string, viewDate: Date) {
    return {
      rangeStart: this.getStartOfPeriod(view, viewDate),
      rangeEnd: this.getEndOfPeriod(view, viewDate)
    }
  }

  createRRule(view: string, viewDate: Date, event: RecurringEvent) {
    return new RRule(
       Object.assign({}, event.rrule, {
         dtstart: this.generateStartTime(view, viewDate, event.startTime),
         until: this.generateEndTime(view, viewDate, event.endTime)
       })
     );
   }
}
