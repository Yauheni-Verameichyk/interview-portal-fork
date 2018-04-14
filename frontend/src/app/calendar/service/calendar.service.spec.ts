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
    title: '20:00 - 21:00 ( you have excluded this time slot from recurring event )'
  };
  const calendarDTO = {
    excludedTimeSlots: [excludedTimeSlot],
    interviews: [],
    specifiedTimeDTOs: [nonrecurringEvent, recurringEvent]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
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
    expect(service.generateStartTime('month', new Date('2018-04-10T17:00:00'), new Date('2018-03-01T00:00:00')))
      .toEqual(new Date('2018-03-25T00:00:00'));
  }));

  it('should return start of recurring event if start of period is earlier', inject([CalendarService], (service: CalendarService) => {
    expect(service.generateStartTime('month', new Date('2018-04-10T17:00:00'), new Date('2018-04-13T00:00:00')))
      .toEqual(new Date('2018-04-13T00:00:00'));
  }));

  it('should return end of period if end of recurring event is later', inject([CalendarService], (service: CalendarService) => {
    expect(service.generateEndTime('month', new Date('2018-04-10T17:00:00'), new Date('2018-06-01T00:00:00')))
      .toEqual(new Date('2018-04-30T23:59:59'));
  }));

  it('should return end of recurring event if end of period is later', inject([CalendarService], (service: CalendarService) => {
    expect(service.generateEndTime('month', new Date('2018-04-10T17:00:00'), new Date('2018-04-13T00:00:00')))
      .toEqual(new Date('2018-04-13T00:00:00'));
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
