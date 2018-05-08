import { TestBed, inject } from '@angular/core/testing';

import { CalendarService } from './calendar.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SpecifiedTimeControllerService } from '../../api/services/specified-time-controller.service';
import { ExcludedTimeSlotControllerService } from '../../api/services/excluded-time-slot-controller.service';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { Observable } from 'rxjs/Observable';
import RRule = require('rrule');
import { CalendarEventAction, CalendarEvent } from 'angular-calendar';
import { Router } from '@angular/router';
import { MO } from 'rrule';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomValidators } from 'ng4-validators';

describe('CalendarService', () => {
  const actions: CalendarEventAction[] = [
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

  const excludedActions: CalendarEventAction[] = [
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
    }];

  const nonrecurringCalendarEvent = {
    id: 1,
    color: { primary: '#008000', secondary: '#ccffcc' },
    meta: { incrementsBadgeTotal: false, repeatable: false, groupId: undefined },
    start: new Date('2018-04-10T20:00:00'),
    title: '20:00 - 21:00',
    end: new Date('2018-04-10T21:00:00'),
    actions: actions
  };
  const secondNonrecurringCalendarEvent = {
    id: 13,
    color: { primary: '#008000', secondary: '#ccffcc' },
    meta: { incrementsBadgeTotal: false, repeatable: false, groupId: undefined },
    start: new Date('2018-03-10T20:00:00'),
    title: '20:00 - 21:00',
    actions: actions
  };

  const firstRecurringCalendarEvent = {
    id: 2,
    color: { primary: '#008000', secondary: '#ccffcc' },
    meta: { incrementsBadgeTotal: false, repeatable: true, groupId: undefined },
    rrule: {
      freq: RRule.WEEKLY,
      byweekday: [RRule.SA],
      interval: 1
    },
    start: new Date('2018-03-10T20:00:00'),
    startTime: new Date('2018-03-10T20:00:00'),
    title: '20:00 - 21:00',
    endTime: new Date('2018-03-24T21:00:00'),
    end: new Date('2018-03-10T21:00:00'),
    actions: actions,
  };
  const secondRecurringCalendarEvent = {
    id: 2,
    color: { primary: '#008000', secondary: '#ccffcc' },
    meta: { incrementsBadgeTotal: false, repeatable: true, groupId: undefined },
    rrule: {
      freq: RRule.WEEKLY,
      byweekday: [RRule.SA],
      interval: 1
    },
    start: new Date('2018-03-17T20:00:00'),
    startTime: new Date('2018-03-10T20:00:00'),
    title: '20:00 - 21:00',
    endTime: new Date('2018-03-24T21:00:00'),
    end: new Date('2018-03-17T21:00:00'),
    actions: actions
  };
  const recurringEvent = {
    id: 2,
    startTime: '2018-03-10T20:00:00',
    repeatInterval: 'P7D',
    endTime: '2018-03-24T21:00:00',
    user: { id: 1, name: 'Ananas' }
  };
  const nonrecurringEvent = {
    id: 1,
    startTime: '2018-04-10T20:00:00',
    user: { id: 1, name: 'Ananas' }
  };
  const excludedTimeSlot = { id: 12, startTime: '2018-03-24T20:00:00' };
  const excludedTimeSlotCalendarEvent = {
    actions: excludedActions,
    color: { primary: '#ad2121', secondary: '#FAE3E3' },
    id: 12,
    meta: { incrementsBadgeTotal: false },
    start: new Date('2018-03-24T20:00:00'),
    end: new Date('2018-03-24T21:00:00'),
    title: '20:00 - 21:00 ( you have excluded this time slot from recurring event )'
  };
  const calendarDTO = {
    excludedTimeSlots: [excludedTimeSlot],
    interviews: [],
    specifiedTimeDTOs: [nonrecurringEvent, recurringEvent]
  };
  const yearlySpecifiedTimeDTO = {
    endTime: '2018-05-10T20:00:00',
    startTime: '2018-04-10T20:00:00',
    id: 1,
    user: { id: 1, name: 'Ananas' },
    repeatInterval: 'P1Y',
    duration: 1
  };
  const monthlySpecifiedTimeDTO = {
    endTime: '2018-05-10T20:00:00',
    startTime: '2018-04-10T20:00:00',
    id: 1,
    user: { id: 1, name: 'Ananas' },
    repeatInterval: 'P1M',
    duration: 1
  };
  const weeklySpecifiedTimeDTO = {
    endTime: '2018-05-10T20:00:00',
    startTime: '2018-04-10T20:00:00',
    id: 1,
    user: { id: 1, name: 'Ananas' },
    repeatInterval: 'P7D',
    duration: 1
  };
  const incorrectSpecifiedTimeDTO = {
    endTime: '2018-05-10T20:00:00',
    startTime: '2018-04-10T20:00:00',
    id: 1,
    user: { id: 1, name: 'Ananas' },
    repeatInterval: '12',
    duration: 1
  };
  const yearlySpecifiedTime = {
    endTime: new Date('2018-05-10T20:00:00'),
    startTime: new Date('2018-04-10T20:00:00'),
    id: 1,
    user: { id: 1, name: 'Ananas' },
    repeatInterval: 'P1Y',
    duration: 1,
    isRepeatable: true,
    repeatPattern: 'yearly',
    repeatPeriod: 1
  };
  const monthlySpecifiedTime = {
    endTime: new Date('2018-05-10T20:00:00'),
    startTime: new Date('2018-04-10T20:00:00'),
    id: 1,
    user: { id: 1, name: 'Ananas' },
    repeatInterval: 'P1M',
    duration: 1,
    isRepeatable: true,
    repeatPattern: 'monthly',
    repeatPeriod: 1
  };
  const weeklySpecifiedTime = {
    endTime: new Date('2018-05-10T20:00:00'),
    startTime: new Date('2018-04-10T20:00:00'),
    id: 1,
    user: { id: 1, name: 'Ananas' },
    repeatInterval: 'P7D',
    duration: 1,
    isRepeatable: true,
    repeatPattern: 'weekly',
    repeatPeriod: 1
  };
  const nonrecurringSpecifiedTimeDTO = {
    endTime: '2018-04-10T21:00:00',
    startTime: '2018-04-10T20:00:00',
    id: 1,
    user: { id: 1, name: 'Ananas' },
    duration: 1
  };
  const nonrecurringSpecifiedTime = {
    endTime: new Date('2018-04-10T21:00:00'),
    startTime: new Date('2018-04-10T20:00:00'),
    id: 1,
    user: { id: 1, name: 'Ananas' },
    duration: 1,
    isRepeatable: false,
    repeatInterval: undefined
  };
  const formGroup = new FormGroup({
    'duration': new FormControl([weeklySpecifiedTime.duration], [Validators.required,
    CustomValidators.digits, CustomValidators.range([1, 8])]),
    'startTime': new FormControl([weeklySpecifiedTime.duration], [Validators.required, CustomValidators.date]),
    'isRepeatable': new FormControl([weeklySpecifiedTime.isRepeatable]),
    'repeatPattern': new FormControl([weeklySpecifiedTime.repeatPattern]),
    'repeatPeriod': new FormControl([weeklySpecifiedTime.repeatPeriod]),
    'endTime': new FormControl([weeklySpecifiedTime.endTime])
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      providers: [CalendarService,
        { provide: SpecifiedTimeControllerService, useClass: SpecifiedTimeControllerServiceStub },
        { provide: ExcludedTimeSlotControllerService, useClass: ExcludedTimeSlotControllerServiceStub },
        { provide: PopupService, useClass: PopupServiceStub },
        { provide: Router, useClass: RouterStub },
      ]
    });
  });

  it('should be created', inject([CalendarService], (service: CalendarService) => {
    expect(service).toBeTruthy();
  }));

  it('should generate calendar events list', inject([CalendarService], (service: CalendarService) => {
    const events = service.generateCalendarEvents(calendarDTO, 'month', new Date('2018-03-18T20:00:00'));
    firstRecurringCalendarEvent.actions = service.actions;
    secondRecurringCalendarEvent.actions = service.actions;
    excludedTimeSlotCalendarEvent.actions = service.excludedActions;
    nonrecurringCalendarEvent.actions = service.actions;
    expect(events).toEqual([firstRecurringCalendarEvent, secondRecurringCalendarEvent,
      excludedTimeSlotCalendarEvent, nonrecurringCalendarEvent]);
  }));

  it('should navigate to edit form when edit button was clicked', inject([CalendarService, Router],
    (service: CalendarService, router: Router) => {
      spyOn(router, 'navigate').and.callThrough();
      service.actions[0].onClick({ event: firstRecurringCalendarEvent });
      expect(router.navigate).toHaveBeenCalledWith([{ outlets: { popup: ['calendar', 'edit', firstRecurringCalendarEvent.id] } }]);
    }));

  it('should navigate to delete form when delete button was clicked', inject([CalendarService, Router],
    (service: CalendarService, router: Router) => {
      spyOn(router, 'navigate').and.callThrough();
      service.actions[1].onClick({ event: firstRecurringCalendarEvent });
      expect(router.navigate).toHaveBeenCalledWith([{
        outlets: {
          popup: ['calendar', 'delete', firstRecurringCalendarEvent.id, 'start',
            service.convertDateToString(firstRecurringCalendarEvent.start), 'group',
            firstRecurringCalendarEvent.meta.groupId, 'repeatable', firstRecurringCalendarEvent.meta.repeatable]
        }
      }]);
    }));

  it('should delete excludedTimeSlot when restore button was clicked', inject([CalendarService, Router, PopupService],
    (service: CalendarService, router: Router, popupService: PopupService) => {
      spyOn(router, 'navigate').and.callThrough();
      spyOn(popupService, 'displayMessage').and.callThrough();
      service.excludedActions[0].onClick({ event: firstRecurringCalendarEvent });
      expect(router.navigate).toHaveBeenCalledWith(['calendar']);
      expect(popupService.displayMessage).toHaveBeenCalledWith('Time slot was restored', router);
    }));

  it('should throw error during excludedTimeSlot deleting', inject([CalendarService, Router,
    PopupService, ExcludedTimeSlotControllerService],
    (service: CalendarService, router: Router,
      popupService: PopupService, excludedTimeSlotControllerService: ExcludedTimeSlotControllerService) => {
      spyOn(router, 'navigate').and.callThrough();
      spyOn(popupService, 'displayMessage').and.callThrough();
      spyOn(excludedTimeSlotControllerService, 'deleteUsingDELETE_1').and.callFake((parameterName) => Observable.throw(new Error()));
      service.excludedActions[0].onClick({ event: firstRecurringCalendarEvent });
      expect(router.navigate).toHaveBeenCalledWith(['error']);
      expect(popupService.displayMessage).toHaveBeenCalledWith('Error during time slot restoration', router);
    }));

  it('should add calendar event to array', inject([CalendarService], (service: CalendarService) => {
    const calendarEventsArray = [nonrecurringCalendarEvent, firstRecurringCalendarEvent];
    service.addCalendarEventToArray(calendarEventsArray, secondRecurringCalendarEvent);
    expect(calendarEventsArray).toEqual([nonrecurringCalendarEvent, firstRecurringCalendarEvent, secondRecurringCalendarEvent]);
  }));

  it('should not add calendar event to array if such start present', inject([CalendarService], (service: CalendarService) => {
    const calendarEventsArray = [nonrecurringCalendarEvent, firstRecurringCalendarEvent];
    service.addCalendarEventToArray(calendarEventsArray, secondNonrecurringCalendarEvent);
    expect(calendarEventsArray).toEqual([nonrecurringCalendarEvent, firstRecurringCalendarEvent]);
  }));

  it('should return start of selected calendar period', inject([CalendarService], (service: CalendarService) => {
    expect(service.getStartOfPeriod('month', new Date('2018-04-10T17:00:00')))
      .toEqual('2018-04-01T00:00:00');
  }));

  it('should return end of selected calendar period', inject([CalendarService], (service: CalendarService) => {
    expect(service.getEndOfPeriod('month', new Date('2018-04-10T17:00:00')))
      .toEqual('2018-04-30T23:59:59');
  }));

  it('should return start of period if start of recurring event is earlier', inject([CalendarService], (service: CalendarService) => {
    expect(service.generateStartTimeForRange('month', new Date('2018-04-10T17:00:00'), new Date('2018-03-01T00:00:00')))
      .toEqual(new Date('2018-03-25T00:00:00'));
  }));

  it('should return start of recurring event if start of period is earlier', inject([CalendarService], (service: CalendarService) => {
    expect(service.generateStartTimeForRange('month', new Date('2018-04-10T17:00:00'), new Date('2018-04-13T00:00:00')))
      .toEqual(new Date('2018-04-13T00:00:00'));
  }));

  it('should return end of period if end of recurring event is later', inject([CalendarService], (service: CalendarService) => {
    const expectedDate = new Date('2018-04-30T23:59:59');
    expectedDate.setMilliseconds(999);
    expect(service.generateEndTimeForRange('month', new Date('2018-04-10T17:00:00'), new Date('2018-06-10T23:00:00')))
      .toEqual(expectedDate);
  }));

  it('should return end of recurring event if end of period is later', inject([CalendarService], (service: CalendarService) => {
    const expectedDate = new Date('2018-04-13T00:00:00');
    expect(service.generateEndTimeForRange('month', new Date('2018-04-10T17:00:00'), expectedDate))
      .toEqual(expectedDate);
  }));

  it('should return yearly repeat rule with corresponding repeat interval', inject([CalendarService], (service: CalendarService) => {
    const yearlyRrule = { freq: RRule.YEARLY, bymonth: 4, bymonthday: 10, interval: 1 };
    expect(service.generateRepeatRule(yearlySpecifiedTimeDTO)).toEqual(yearlyRrule);
  }));

  it('should return monthly repeat rule with corresponding repeat interval', inject([CalendarService], (service: CalendarService) => {
    const monthlyRrule = { freq: RRule.MONTHLY, bymonthday: 10, interval: 1 };
    expect(service.generateRepeatRule(monthlySpecifiedTimeDTO)).toEqual(monthlyRrule);
  }));

  it('should return weekly repeat rule with corresponding repeat interval', inject([CalendarService], (service: CalendarService) => {
    const weeklyRrule = { freq: RRule.WEEKLY, byweekday: [RRule.TU], interval: 1 };
    expect(service.generateRepeatRule(weeklySpecifiedTimeDTO)).toEqual(weeklyRrule);
  }));

  it('should throw error if repeat interval is incorrect', inject([CalendarService], (service: CalendarService) => {
    expect(function () { service.generateRepeatRule(incorrectSpecifiedTimeDTO); }).toThrowError('Unknown period');
  }));

  it('should generate params for calendar request', inject([CalendarService], (service: CalendarService) => {
    expect(service.generateRequestParamsForEventsForUser('month', new Date('2018-04-11T23:59:59')))
      .toEqual({ rangeStart: '2018-04-01T00:00:00', rangeEnd: '2018-04-30T23:59:59' });
  }));

  it('should sort calendar events list', inject([CalendarService], (service: CalendarService) => {
    const array = [nonrecurringCalendarEvent, secondRecurringCalendarEvent,
      firstRecurringCalendarEvent, secondNonrecurringCalendarEvent];
    service.sortCalendarEvents(array);
    expect(array).toEqual([firstRecurringCalendarEvent,
      secondNonrecurringCalendarEvent, secondRecurringCalendarEvent, nonrecurringCalendarEvent]);
  }));

  it('should convert yearly SpecifiedTimeDTO to SpecifiedTime', inject([CalendarService], (service: CalendarService) => {
    expect(service.convertDTOToSpecifiedTime(yearlySpecifiedTimeDTO)).toEqual(yearlySpecifiedTime);
  }));

  it('should convert monthly SpecifiedTimeDTO to SpecifiedTime', inject([CalendarService], (service: CalendarService) => {
    expect(service.convertDTOToSpecifiedTime(monthlySpecifiedTimeDTO)).toEqual(monthlySpecifiedTime);
  }));

  it('should convert weekly SpecifiedTimeDTO to SpecifiedTime', inject([CalendarService], (service: CalendarService) => {
    expect(service.convertDTOToSpecifiedTime(weeklySpecifiedTimeDTO)).toEqual(weeklySpecifiedTime);
  }));

  it('should convert nonrecurring SpecifiedTimeDTO to SpecifiedTime', inject([CalendarService], (service: CalendarService) => {
    expect(service.convertDTOToSpecifiedTime(nonrecurringSpecifiedTimeDTO)).toEqual(nonrecurringSpecifiedTime);
  }));

  it('should convert yearly SpecifiedTime to SpecifiedTimeDTO', inject([CalendarService], (service: CalendarService) => {
    const expected = Object.assign(yearlySpecifiedTimeDTO);
    expected.user = null;
    expected.endTime = '2018-05-10T21:00:00';
    expect(service.convertSpecifiedTimeToDTO(yearlySpecifiedTime)).toEqual(yearlySpecifiedTimeDTO);
  }));

  it('should convert monthly SpecifiedTime to SpecifiedTimeDTO', inject([CalendarService], (service: CalendarService) => {
    const expected = Object.assign(monthlySpecifiedTimeDTO);
    expected.user = null;
    expected.endTime = '2018-05-10T21:00:00';
    expect(service.convertSpecifiedTimeToDTO(monthlySpecifiedTime)).toEqual(monthlySpecifiedTimeDTO);
  }));

  it('should convert weekly SpecifiedTime to SpecifiedTimeDTO', inject([CalendarService], (service: CalendarService) => {
    const expected = Object.assign(weeklySpecifiedTimeDTO);
    expected.user = null;
    expected.endTime = '2018-05-10T21:00:00';
    expect(service.convertSpecifiedTimeToDTO(weeklySpecifiedTime)).toEqual(weeklySpecifiedTimeDTO);
  }));

  it('should convert nonrecurring SpecifiedTime to SpecifiedTimeDTO', inject([CalendarService], (service: CalendarService) => {
    const expected = Object.assign(nonrecurringSpecifiedTimeDTO);
    expected.user = null;
    expected['repeatInterval'] = null;
    expect(service.convertSpecifiedTimeToDTO(nonrecurringSpecifiedTime)).toEqual(nonrecurringSpecifiedTimeDTO);
  }));

  it('should convert nonrecurring SpecifiedTime without endTime to SpecifiedTimeDTO',
    inject([CalendarService], (service: CalendarService) => {
      const expected = Object.assign(nonrecurringSpecifiedTimeDTO);
      expected.user = null;
      expected['repeatInterval'] = null;
      nonrecurringSpecifiedTimeDTO.endTime = null;
      const actual = Object.assign(nonrecurringSpecifiedTime);
      actual.endTime = null;
      expect(service.convertSpecifiedTimeToDTO(actual)).toEqual(nonrecurringSpecifiedTimeDTO);
    }));

  it('should throw error while trying to generate repeat interval for nonrecurring event',
    inject([CalendarService], (service: CalendarService) => {
      expect(function () { service.generateRepeatInterval(nonrecurringSpecifiedTime); }).toThrowError('Unknown repeat interval');
    }));

  it('should get current time without minutes and seconds',
    inject([CalendarService], (service: CalendarService) => {
      const expected = new Date();
      expected.setMinutes(0);
      expected.setSeconds(0);
      expect(service.getCurrentDate().getDate()).toEqual(expected.getDate());
    }));

  it('should create FormGroup for specified time',
    inject([CalendarService], (service: CalendarService) => {
      expect(service.initFormGroup(weeklySpecifiedTime).controls.length).toEqual(formGroup.controls.length);
    }));

  it('should set validators to FormGroup with repeatable SpecifiedTime',
    inject([CalendarService], (service: CalendarService) => {
      const actual = Object.assign(formGroup);
      service.setValidatorsForRepeatable(actual);
      expect(actual.get('repeatPattern').validator.length).toEqual(1);
    }));

  it('should set validators to FormGroup with non repeatable SpecifiedTime',
    inject([CalendarService], (service: CalendarService) => {
      const actual = Object.assign(formGroup);
      service.setValidatorsForRepeatable(actual);
      expect(actual.get('repeatPattern').validator.length).toEqual(1);
      service.setValidatorsForNonRepeatable(actual);
      expect(actual.get('repeatPattern').validator).toEqual(null);
    }));

  it('should not update validator for endTime if value does not changed',
    inject([CalendarService], (service: CalendarService) => {
      const actual = Object.assign(formGroup);
      service.updateEndTimeValidator(actual);
      expect(actual.get('endTime').validator).toEqual(null);
    }));

  it('should not update validator for endTime if value is null',
    inject([CalendarService], (service: CalendarService) => {
      const actual = Object.assign(formGroup);
      actual.get('endTime').value = null;
      service.updateEndTimeValidator(actual);
      expect(actual.get('endTime').validator).toEqual(null);
    }));

  it('should update validator for endTime',
    inject([CalendarService], (service: CalendarService) => {
      const actual = Object.assign(formGroup);
      expect(actual.get('endTime').validator).toEqual(null);
      actual.get('endTime').value = new Date('2020-05-10T20:00:00');
      service.updateEndTimeValidator(actual);
      expect(actual.get('endTime').validator.length).toEqual(1);
    }));

  it('should set error if end time is earlier than start time',
    inject([CalendarService], (service: CalendarService) => {
      const actual = Object.assign(formGroup);
      actual.get('startTime').value = new Date('2016-05-10T20:00:00');
      actual.get('endTime').value = new Date('2015-05-10T20:00:00');
      service.updateEndTimeValidator(actual);
      expect(actual.get('endTime').errors).toEqual({ minDate: 'minDate' });
    }));

  it('should not add excluded time slot to list if there is no events with the same start time',
    inject([CalendarService], (service: CalendarService) => {
      const calendarEvents = [];
      service.addExcludedTimeSlotsToCalendarEvents([excludedTimeSlot], calendarEvents);
      expect(calendarEvents).toEqual([]);
    }));

  it('should display deleted message',
    inject([CalendarService, Router, PopupService], (service: CalendarService, router: Router, popupService: PopupService) => {
      spyOn(router, 'navigate').and.callThrough();
      spyOn(popupService, 'displayMessage').and.callThrough();
      service.displayDeletedMessage(null);
      expect(router.navigate).toHaveBeenCalledWith(['calendar']);
      expect(popupService.displayMessage).toHaveBeenCalledWith('Time slot was deleted', router);
    }));

    it('should display error message',
    inject([CalendarService, Router, PopupService], (service: CalendarService, router: Router, popupService: PopupService) => {
      spyOn(router, 'navigate').and.callThrough();
      spyOn(popupService, 'displayMessage').and.callThrough();
      service.displayErrorMessage(null);
      expect(router.navigate).toHaveBeenCalledWith(['error']);
      expect(popupService.displayMessage).toHaveBeenCalledWith('Error during time slot deleting', router);
    }));
});

class SpecifiedTimeControllerServiceStub { }

class ExcludedTimeSlotControllerServiceStub {
  deleteUsingDELETE_1(any) {
    return Observable.of(null);
  }
}

class PopupServiceStub {
  displayMessage(message, router) { }
}

class RouterStub {
  navigate(any) { }
}
