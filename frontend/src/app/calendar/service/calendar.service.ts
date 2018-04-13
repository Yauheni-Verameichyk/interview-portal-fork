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
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng4-validators';
import { ExcludedTimeSlot } from '../../api/models/excluded-time-slot';
import { ExcludedTimeSlotControllerService } from '../../api/services/excluded-time-slot-controller.service';
import { RecurringEvent } from '../../api/models/recurring-event';
import { CalendarDTO } from '../../api/models/calendar-dto';

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
        this.router.navigate([{
          outlets: {
            popup: ['calendar', 'delete', event.id, 'start',
              this.convertDateToString(event.start), 'group', event.meta.groupId, 'repeatable', event.meta.repeatable]
          }
        }]);
      }
    }
  ];

  excludedActions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-undo"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.excludedTimeSotControllerService.deleteUsingDELETE_1(+event.id).subscribe(
          (success) => {
            this.router.navigate(['calendar']);
            this.popupService.displayMessage('Time slot was restored', this.router);
          },
          (error) => {
            this.router.navigate(['error']);
            this.popupService.displayMessage('Error during time slot restoration', this.router);
          });
      }
    }
  ];

  weekDays = [RRule.SU, RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA];

  constructor(private router: Router,
    private specifiedTimeControllerService: SpecifiedTimeControllerService,
    private excludedTimeSotControllerService: ExcludedTimeSlotControllerService,
    private popupService: PopupService) { }

  generateCalendarEvents(calendarDTO: CalendarDTO, view: string, viewDate: Date): CalendarEvent[] {
    const calendarEvents = this.generateAvailableTimeSlots(calendarDTO, view, viewDate);
    this.addExcludedTimeSlotsToCalendarEvents(calendarDTO.excludedTimeSlots, calendarEvents);
    this.sortCalendarEvents(calendarEvents);
    return calendarEvents;
  }

  generateAvailableTimeSlots(calendarDTO: CalendarDTO, view: string, viewDate: Date): CalendarEvent[] {
    let calendarEvents = [];
    const recurringEvents = [];
    const nonrecurringCalendarEvents = [];
    for (const timeSlot of calendarDTO.specifiedTimeDTOs) {
      timeSlot.repeatInterval ? recurringEvents.push(this.generateRecurringEvent(timeSlot))
        : this.addCalendarEventToArray(nonrecurringCalendarEvents,
          this.generateNonRepeatableEvent(timeSlot));
    }
    calendarEvents = calendarEvents.concat(nonrecurringCalendarEvents);
    this.addRecurringEventsToCalendarEvents(recurringEvents, calendarEvents, view, viewDate);
    return calendarEvents;
  }

  addRecurringEventsToCalendarEvents(recurringEvents: RecurringEvent[], calendarEvents: CalendarEvent[],
    view: string, viewDate: Date): void {
    recurringEvents.forEach(event => {
      const rule: RRule = this.createRRule(view, viewDate, event);
      rule.all().forEach(date => {
        const calendarEvent = Object.assign({}, event, { start: new Date(date) },
          { actions: this.actions },
          { meta: { incrementsBadgeTotal: false, repeatable: true, groupId: event.meta.groupId } });
        this.addCalendarEventToArray(calendarEvents, calendarEvent);
      });
    });
  }


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
      meta: { groupId: specifiedTime.groupId }
    };
  }

  generateNonRepeatableEvent(specifiedTime: SpecifiedTimeDTO): CalendarEvent {
    const startTime = new Date(specifiedTime.startTime);
    return {
      id: specifiedTime.id,
      title: startTime.getHours().toString() + ':' + startTime.getMinutes().toString() + 0 + ' - '
        + (startTime.getHours() + 1).toString() + ':' + startTime.getMinutes().toString() + 0,
      start: startTime,
      color: this.colors.green,
      actions: this.actions,
      meta: { incrementsBadgeTotal: false, repeatable: false, groupId: specifiedTime.groupId }
    };
  }

  generateExcludedTimeSlot(excludedTimeSlot: ExcludedTimeSlot) {
    const startTime = new Date(excludedTimeSlot.startTime);
    return {
      id: excludedTimeSlot.id,
      title: startTime.getHours().toString() + ':' + startTime.getMinutes().toString() + 0 + ' - '
        + (startTime.getHours() + 1).toString() + ':' + startTime.getMinutes().toString() + 0 +
        ' ( you have excluded this time slot from recurring event )',
      start: startTime,
      color: this.colors.red,
      actions: this.excludedActions,
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
      if (a.start > b.start) { return 1; }
      if (a.start < b.start) { return -1; } return 0;
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
      specifiedTime.repeatPeriod = +specifiedTime.repeatInterval.match(/\d+Y/)[0].slice(0, -1);
    }
    if (specifiedTime.repeatInterval.match(/\d+M/)) {
      specifiedTime.repeatPattern = 'monthly';
      specifiedTime.repeatPeriod = +specifiedTime.repeatInterval.match(/\d+M/)[0].slice(0, -1);
    }
    if (specifiedTime.repeatInterval.match(/\d+D/)) {
      specifiedTime.repeatPattern = 'weekly';
      specifiedTime.repeatPeriod = +specifiedTime.repeatInterval.match(/\d+D/)[0].slice(0, -1) / 7;
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
        return `P${specifiedTime.repeatPeriod}Y`;
      case 'monthly':
        return `P${specifiedTime.repeatPeriod}M`;
      case 'weekly':
        return `P${specifiedTime.repeatPeriod * 7}D`;
      default:
        throw new Error('Unknown repeat interval');
    }
  }

  getCurrentDate(): Date {
    const date = new Date();
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
  }

  initFormGroup(specifiedTime: SpecifiedTime): FormGroup {
    return new FormGroup({
      'duration': new FormControl([specifiedTime.duration], [Validators.required,
      CustomValidators.digits, CustomValidators.range([1, 8])]),
      'startTime': new FormControl([specifiedTime.duration], [Validators.required, CustomValidators.date]),
      'isRepeatable': new FormControl([specifiedTime.isRepeatable]),
      'repeatPattern': new FormControl([specifiedTime.repeatPattern]),
      'repeatPeriod': new FormControl([specifiedTime.repeatPeriod]),
      'endTime': new FormControl([specifiedTime.endTime])
    });
  }

  setValidatorsForRepeatable(specifiedTimeForm: FormGroup): void {
    specifiedTimeForm.get('repeatPattern').setValidators([Validators.required]);
    specifiedTimeForm.get('repeatPeriod').setValidators([Validators.required, CustomValidators.digits, CustomValidators.min(1)]);
    specifiedTimeForm.get('endTime').setValidators([Validators.required,
    CustomValidators.minDate(specifiedTimeForm.get('startTime').value)]);
    specifiedTimeForm.get('repeatPattern').setErrors(null);
    specifiedTimeForm.get('repeatPeriod').setErrors(null);
    specifiedTimeForm.get('endTime').setErrors(null);
  }

  setValidatorsForNonRepeatable(specifiedTimeForm: FormGroup): void {
    specifiedTimeForm.get('repeatPattern').setValidators([]);
    specifiedTimeForm.get('repeatPeriod').setValidators([]);
    specifiedTimeForm.get('endTime').setValidators([]);
    specifiedTimeForm.get('repeatPattern').setErrors(null);
    specifiedTimeForm.get('repeatPeriod').setErrors(null);
    specifiedTimeForm.get('endTime').setErrors(null);
  }

  updateEndTimeValidator(specifiedTimeForm: FormGroup): void {
    specifiedTimeForm.get('endTime').setErrors(null);
    if (!(specifiedTimeForm.get('endTime').value instanceof Array) && specifiedTimeForm.get('endTime').value) {
      specifiedTimeForm.get('endTime').setValidators([Validators.required,
      CustomValidators.minDate(specifiedTimeForm.get('startTime').value)]);
    }
    if (specifiedTimeForm.get('endTime').value && specifiedTimeForm.get('startTime').value >= specifiedTimeForm.get('endTime').value
      && !(specifiedTimeForm.get('endTime').value instanceof Array)) {
      specifiedTimeForm.get('endTime').setErrors({ minDate: 'minDate' });
    }
    specifiedTimeForm.updateValueAndValidity();
  }

  displayDeletedMessage(success): void {
    this.router.navigate(['calendar']);
    this.popupService.displayMessage('Time slot was deleted', this.router);
  }

  displayErrorMessage(error): void {
    this.router.navigate(['error']);
    this.popupService.displayMessage('Error during time slot deleting', this.router);
  }

  addExcludedTimeSlotsToCalendarEvents(excludedTimeSlots: ExcludedTimeSlot[], calendarEvents: CalendarEvent[]): void {
    for (const excludedTimeSlot of excludedTimeSlots) {
      const excludedEvents = calendarEvents.filter(calendarEvent => JSON.stringify(calendarEvent.start) ===
        JSON.stringify(new Date(excludedTimeSlot.startTime)));
      if (excludedEvents.length !== 0) {
        calendarEvents.splice(calendarEvents.indexOf(excludedEvents[0]), 1);
        calendarEvents.push(this.generateExcludedTimeSlot(excludedTimeSlot));
      }
    }
  }
}
