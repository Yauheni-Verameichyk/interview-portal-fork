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
import { RRule } from 'rrule';
import { SpecifiedTimeDTO } from '../../api/models/specified-time-dto';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { Router } from '@angular/router';
import { SpecifiedTime } from '../../api/models/specified-time';
import { SpecifiedTimeControllerService } from '../../api/services/specified-time-controller.service';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';

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
        this.router.navigate([{ outlets: { popup: ['calendar', 'edit', event.id] } }]);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        if (confirm('Delete chosen time slot?')) {
          this.specifiedTimeControllerService.deleteUsingDELETE_1(+event.id).subscribe((success) => {
            this.router.navigate(['calendar']);
            this.popupService.displayMessage('Time slot was deleted', this.router);
          }, (error) => {
            this.popupService.displayMessage('Error during time slot deleting', this.router);
          });
        }
      }
    }
  ];

  weekDays = [RRule.SU, RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA];

  constructor(private router: Router,
    private specifiedTimeControllerService: SpecifiedTimeControllerService,
    private popupService: PopupService) { }

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
      return this.generateYearlyRule(startTime, +specifiedTime.repeatInterval.match(/\d+Y/)[0].slice(0, -1));
    }
    if (specifiedTime.repeatInterval.match(/\d+M/)) {
      return this.generateMonthlyRule(startTime, +specifiedTime.repeatInterval.match(/\d+M/)[0].slice(0, -1));
    }
    if (specifiedTime.repeatInterval.match(/\d+D/)) {
      return this.generateWeeklyRule(startTime, +specifiedTime.repeatInterval.match(/\d+D/)[0].slice(0, -1));
    }
    throw new Error('Unknown period');
  }

  generateYearlyRule(startTime: Date, interval: number): RecurringEvent['rrule'] {
    return {
      freq: RRule.YEARLY,
      bymonth: startTime.getMonth() + 1,
      bymonthday: startTime.getDate(),
      interval: interval
    };
  }

  generateMonthlyRule(startTime: Date, interval: number): RecurringEvent['rrule'] {
    return {
      freq: RRule.MONTHLY,
      bymonthday: startTime.getDate(),
      interval: interval
    };
  }

  generateWeeklyRule(startTime: Date, interval: number): RecurringEvent['rrule'] {
    return {
      freq: RRule.WEEKLY,
      byweekday: [this.weekDays[startTime.getDay()]],
      interval: interval / 7
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
      if (a.start > b.start) { return 1; } if (a.start < b.start) { return -1; } return 0;
    });
  }

  convertDTOToSpecifiedTime(specifiedTimeDTO: SpecifiedTimeDTO) {
    const specifiedTime = {
      endTime: new Date(specifiedTimeDTO.endTime),
      id: specifiedTimeDTO.id,
      repeatInterval: specifiedTimeDTO.repeatInterval,
      startTime: new Date(specifiedTimeDTO.startTime),
      user: specifiedTimeDTO.user,
      duration: 1,
      isRepeatable: !!specifiedTimeDTO.repeatInterval
    };
    if (specifiedTimeDTO.repeatInterval) {
      this.setRepeatPattern(specifiedTimeDTO.repeatInterval, specifiedTime);
    }
    return specifiedTime;
  }

  setRepeatPattern(repeatInterval: string, specifiedTime: SpecifiedTime): void {
    if (specifiedTime.repeatInterval.match(/\d+Y/)) {
      specifiedTime.repeatPattern = 'yearly';
      specifiedTime.repeatPeriod = { years: +specifiedTime.repeatInterval.match(/\d+Y/)[0].slice(0, -1) };
    }
    if (specifiedTime.repeatInterval.match(/\d+M/)) {
      specifiedTime.repeatPattern = 'monthly';
      specifiedTime.repeatPeriod = { months: +specifiedTime.repeatInterval.match(/\d+M/)[0].slice(0, -1) };
    }
    if (specifiedTime.repeatInterval.match(/\d+D/)) {
      specifiedTime.repeatPattern = 'weekly';
      specifiedTime.repeatPeriod = { weeks: +specifiedTime.repeatInterval.match(/\d+D/)[0].slice(0, -1) / 7 };
    }
  }

  convertSpecifiedTimeToDTO(specifiedTime: SpecifiedTime): SpecifiedTimeDTO {
    if (specifiedTime.endTime) {
      specifiedTime.endTime.setHours(specifiedTime.startTime.getHours() + specifiedTime.duration);
    }
    return {
      endTime: specifiedTime.endTime ? this.convertDateToString(specifiedTime.endTime) : null,
      startTime: this.convertDateToString(specifiedTime.startTime),
      id: specifiedTime.id,
      user: null,
      repeatInterval: specifiedTime.isRepeatable ? this.generateRepeatInterval(specifiedTime) : null,
      duration: specifiedTime.duration
    };
  }

  generateRepeatInterval(specifiedTime: SpecifiedTime): string {
    switch (specifiedTime.repeatPattern) {
      case 'yearly':
        return `P${specifiedTime.repeatPeriod.years}Y`;
      case 'monthly':
        return `P${specifiedTime.repeatPeriod.months}M`;
      case 'weekly':
        return `P${specifiedTime.repeatPeriod.weeks * 7}D`;
      default:
        throw new Error('Unknown repeat interval');
    }
  }
}

