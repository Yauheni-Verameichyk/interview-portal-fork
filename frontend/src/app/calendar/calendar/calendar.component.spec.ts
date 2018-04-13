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
import 'rxjs/add/observable/of';

describe('CalendarComponent', () => {

  const routerStub = {
    events: Observable.of(new NavigationEnd(1, 'asd', 'asd')),
    navigate(commands: any[]) { }
  };

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
  const monthDay = {
    date: new Date, isPast: false, isToday: true, isFuture: false,
    isWeekend: false, inMonth: true,
    events: [nonrecurringCalendarEvent], badgeTotal: 0
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
        { provide: CalendarControllerService, useClass: CalendarControllerServiceStub },
        { provide: PopupService, useClass: PopupServiceStub },
        { provide: Router, useValue: routerStub },
      ]
    })
      .compileComponents();
      fixture = TestBed.createComponent(CalendarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should read nonrecurring events', () => {
    expect(component.calendarEvents).toEqual([nonrecurringCalendarEvent]);
  });

  it('should read recurring events', inject([CalendarService], (calendarService: CalendarService) => {
    spyOn(calendarService, 'generateCalendarEvents').and.returnValue([firstRecurringCalendarEvent, secondRecurringCalendarEvent]);
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.calendarEvents).toEqual([firstRecurringCalendarEvent, secondRecurringCalendarEvent]);
  }));

  it('should read recurring events', inject([CalendarService], (calendarService: CalendarService) => {
    spyOn(calendarService, 'generateCalendarEvents').and.returnValue([firstRecurringCalendarEvent, secondRecurringCalendarEvent]);
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.calendarEvents).toEqual([firstRecurringCalendarEvent, secondRecurringCalendarEvent]);
  }));

  it('should fail to read calendar events',
    inject([CalendarControllerService, PopupService],
      (calendarControllerService: CalendarControllerService, popupService: PopupService) => {
        spyOn(calendarControllerService, 'findAllForUserInRangeUsingGET').and
          .callFake((parameterName) => Observable.throw(new Error()));
        spyOn(popupService, 'displayMessage').and.callThrough();
        fixture = TestBed.createComponent(CalendarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(calendarControllerService.findAllForUserInRangeUsingGET).toHaveBeenCalled();
        expect(popupService.displayMessage).toHaveBeenCalledWith('Error during time slots getting', routerStub);
      })
  );

  it('should do nothing if navigation is not ended', inject([Router], (router: Router) => {
    routerStub.events = Observable.of(null);
    spyOn(component, 'readAllEvents').and.callThrough();
    expect(component.readAllEvents).not.toHaveBeenCalled();
  }));

  it('should set activeDayIsOpen to true and set current date as viewDate', () => {
    const date = new Date();
    date.setDate((new Date).getDate() - 5);
    component.dayClicked({ date: (date), events: [nonrecurringCalendarEvent] });
    expect(component.activeDayIsOpen).toEqual(true);
    expect(component.viewDate).toEqual(date);
  });

  it('should not set activeDayIsOpen to true if there is no events', () => {
    const date = new Date();
    date.setDate((new Date).getDate() - 5);
    component.dayClicked({ date: (date), events: [] });
    expect(component.activeDayIsOpen).toEqual(false);
  });

  it('should set activeDayIsOpen to false if it was opened', () => {
    const date = new Date();
    component.dayClicked({ date: (date), events: [] });
    expect(component.activeDayIsOpen).toEqual(false);
  });

  it('should do nothing if chosen day is beyond view range', () => {
    const date = new Date('2018-03-10T20:00:00');
    component.dayClicked({ date: (date), events: [] });
    expect(component.activeDayIsOpen).toEqual(false);
  });

  it('should do nothing if chosen day is beyond view range', () => {
    component.beforeMonthViewRender({ body: [monthDay] });
    expect(monthDay.badgeTotal).toEqual(0);
  });
});

class CalendarServiceStub {
  generateCalendarEvents(calendarDTO, view, viewDate) {
    const nonrecurringCalendarEvent = {
      id: 1,
      color: { primary: '#008000', secondary: '#ccffcc' },
      meta: { incrementsBadgeTotal: false, repeatable: false, groupId: undefined },
      start: new Date('2018-04-10T20:00:00'),
      title: '20:00 - 21:00'
    };

    return [nonrecurringCalendarEvent];
  }
  generateRequestParamsForEventsForUser(view, viewDate) {
    return {};
  }
}

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

