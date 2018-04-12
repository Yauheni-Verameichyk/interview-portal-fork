import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { CalendarService } from '../service/calendar.service';
import { SpecifiedTimeControllerService } from '../../api/services/specified-time-controller.service';
import { CalendarControllerService } from '../../api/services/calendar-controller.service';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { Router, NavigationEnd } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CalendarEvent } from 'angular-calendar';
import { SpecifiedTimeDTO } from '../../api/models/specified-time-dto';
import { RecurringEvent } from '../../api/models/recurring-event';
import RRule = require('rrule');

describe('CalendarComponent', () => {

  const nonrecurringCalendarEvent = {
    id: 1,
    color: { primary: '#008000', secondary: '#ccffcc' },
    meta: { incrementsBadgeTotal: false, repeatable: false, groupId: undefined },
    start: new Date('2018-04-10T20:00:00'),
    title: '20:00 - 21:00'
  };

  const firstRecurringCalendarEvent = {
    id: 2,
    color: { primary: '#008000', secondary: '#ccffcc' },
    meta: { incrementsBadgeTotal: false, repeatable: true, groupId: undefined },
    rrule: {
      freq: RRule.WEEKLY,
      byweekday: [RRule.SU]
    },
    start: new Date('2018-03-11T20:00:00'),
    startTime: new Date('2018-03-10T20:00:00'),
    title: '20:00 - 21:00',
    endTime: new Date('2018-03-24T21:00:00'),
    actions: undefined
  };
  const secondRecurringCalendarEvent = {
    id: 2,
    color: { primary: '#008000', secondary: '#ccffcc' },
    meta: { incrementsBadgeTotal: false, repeatable: true, groupId: undefined },
    rrule: {
      freq: RRule.WEEKLY,
      byweekday: [RRule.SU]
    },
    start: new Date('2018-03-18T20:00:00'),
    startTime: new Date('2018-03-10T20:00:00'),
    title: '20:00 - 21:00',
    endTime: new Date('2018-03-24T21:00:00'),
    actions: undefined
  };
  const recurringEvent = {
    id: 2,
    startTime: '2018-03-10T20:00:00',
    repeatInterval: 'P7D',
    endTime: '2018-03-24T21:00:00',
    user: { id: 1, name: 'Ananas' }
  };

  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, SharedModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CalendarComponent],
      providers: [
        { provide: CalendarService, useClass: CalendarServiceStub },
        { provide: SpecifiedTimeControllerService, useClass: SpecifiedTimeControllerServiceStub },
        { provide: CalendarControllerService, useClass: CalendarControllerServiceStub },
        { provide: PopupService, useClass: PopupServiceStub },
        { provide: Router, useClass: RouterStub },
      ]
    })
      .compileComponents();
  }));

  it('should be created', () => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should read nonrecurring events', () => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.calendarEvents).toEqual([nonrecurringCalendarEvent]);
  });

  it('should read recurring events',
    inject([CalendarControllerService],
      (calendarControllerService: CalendarControllerService) => {
        spyOn(calendarControllerService, 'findAllForUserInRangeUsingGET').and
          .returnValue(Observable.of({
            excludedTimeSlots: [],
            interviews: [],
            specifiedTimeDTOs: [recurringEvent]
          }));
        fixture = TestBed.createComponent(CalendarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component.calendarEvents).toEqual([firstRecurringCalendarEvent, secondRecurringCalendarEvent]);
      })
  );
});

class CalendarServiceStub {
  generateRequestParamsForEventsForUser(view, viewDate) {
    return {};
  }

  addExcludedTimeSlotsToCalendarEvents(excludedTimeSlots, calendarEvents) { }

  sortCalendarEvents(calendarEvents) { }

  generateRecurringEvent(specifiedTime: SpecifiedTimeDTO): RecurringEvent {
    const startTime = new Date(specifiedTime.startTime);
    const endTime = new Date(specifiedTime.endTime);
    return {
      id: specifiedTime.id,
      title: startTime.getHours().toString() + ':' + startTime.getMinutes().toString() + 0 + ' - '
        + (startTime.getHours() + 1).toString() + ':' + startTime.getMinutes().toString() + 0,
      color: { primary: '#008000', secondary: '#ccffcc' },
      startTime: startTime,
      endTime: endTime,
      rrule: {
        freq: RRule.WEEKLY,
        byweekday: [RRule.SU]
      },
      meta: { groupId: specifiedTime.groupId }
    };
  }

  createRRule(view: string, viewDate: Date, event: RecurringEvent) {
    return new RRule(
      Object.assign({}, event.rrule, {
        dtstart: new Date('2018-03-10T20:00:00'),
        until: new Date('2018-03-24T20:00:00')
      })
    );
  }

  generateNonRepeatableEvent(specifiedTime: SpecifiedTimeDTO): CalendarEvent {
    const startTime = new Date(specifiedTime.startTime);
    return {
      id: specifiedTime.id,
      title: startTime.getHours().toString() + ':' + startTime.getMinutes().toString() + 0 + ' - '
        + (startTime.getHours() + 1).toString() + ':' + startTime.getMinutes().toString() + 0,
      start: startTime,
      color: { primary: '#008000', secondary: '#ccffcc' },
      // actions: this.actions,
      meta: { incrementsBadgeTotal: false, repeatable: false, groupId: specifiedTime.groupId }
    };
  }

  addCalendarEventToArray(array, event) {
    if (array.filter(listEvent => JSON.stringify(listEvent.start) === JSON.stringify(event.start)).length === 0) {
      array.push(event);
    }
  }
}

class SpecifiedTimeControllerServiceStub { }

class CalendarControllerServiceStub {
  nonrecurringEvent = { id: 1, startTime: '2018-04-10T20:00:00', user: { id: 1, name: 'Ananas' } };

  findAllForUserInRangeUsingGET(any) {
    return Observable.of({
      excludedTimeSlots: [],
      interviews: [],
      specifiedTimeDTOs: [this.nonrecurringEvent]
    });
  }
}

class PopupServiceStub {
  displayMessage(string: string, router: Router) { }
}

class RouterStub {
  events = Observable.of(new NavigationEnd(1, 'asd', 'asd'));
  navigate(commands: any[]) { }
}
