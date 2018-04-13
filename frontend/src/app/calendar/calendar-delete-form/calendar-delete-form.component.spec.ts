import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CalendarDeleteFormComponent } from './calendar-delete-form.component';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CalendarService } from '../service/calendar.service';
import { SpecifiedTimeControllerService } from '../../api/services/specified-time-controller.service';
import { ExcludedTimeSlotControllerService } from '../../api/services/excluded-time-slot-controller.service';
import { LightFieldService } from '../../shared/validator/service/light-field.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

describe('CalendarDeleteFormComponent', () => {
  let component: CalendarDeleteFormComponent;
  let fixture: ComponentFixture<CalendarDeleteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, FormsModule, SharedModule],
      declarations: [CalendarDeleteFormComponent],
      providers: [
        { provide: CalendarService, useClass: CalendarServiceStub },
        { provide: SpecifiedTimeControllerService, useClass: SpecifiedTimeControllerServiceStub },
        { provide: ExcludedTimeSlotControllerService, useClass: ExcludedTimeSlotControllerServiceStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: LightFieldService, useClass: LightFieldServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid deleteOptionForm after creation', () => {
    expect(component.deleteOptionForm.valid).toBeFalsy();
  });

  it('should delete single hour from series', inject([SpecifiedTimeControllerService, CalendarService],
    (specifiedTimeControllerService: SpecifiedTimeControllerService, calendarService: CalendarService) => {
      spyOn(specifiedTimeControllerService, 'deleteUsingDELETE_1').and.callThrough();
      spyOn(calendarService, 'displayDeletedMessage').and.callThrough();
      component.deleteOption = 'DELETE_SERIES';
      fixture.detectChanges();
      component.deleteSpecifiedTime();
      expect(calendarService.displayDeletedMessage).toHaveBeenCalled();
    }));

  it('should fail during deleting single hour from series', inject([SpecifiedTimeControllerService, CalendarService],
    (specifiedTimeControllerService: SpecifiedTimeControllerService, calendarService: CalendarService) => {
      spyOn(specifiedTimeControllerService, 'deleteUsingDELETE_1').and.callFake((parameterName) => Observable.throw(new Error()));
      spyOn(calendarService, 'displayErrorMessage').and.callThrough();
      component.deleteOption = 'DELETE_SERIES';
      fixture.detectChanges();
      component.deleteSpecifiedTime();
      expect(calendarService.displayErrorMessage).toHaveBeenCalled();
    }));

  it('should delete group', inject([SpecifiedTimeControllerService, CalendarService],
    (specifiedTimeControllerService: SpecifiedTimeControllerService, calendarService: CalendarService) => {
      spyOn(specifiedTimeControllerService, 'deleteByGroupIdUsingDELETE').and.callThrough();
      spyOn(calendarService, 'displayDeletedMessage').and.callThrough();
      component.deleteOption = 'DELETE_GROUP';
      fixture.detectChanges();
      component.deleteSpecifiedTime();
      expect(calendarService.displayDeletedMessage).toHaveBeenCalled();
    }));

  it('should fail during deleting group', inject([SpecifiedTimeControllerService, CalendarService],
    (specifiedTimeControllerService: SpecifiedTimeControllerService, calendarService: CalendarService) => {
      spyOn(specifiedTimeControllerService, 'deleteByGroupIdUsingDELETE').and.callFake((parameterName) => Observable.throw(new Error()));
      spyOn(calendarService, 'displayErrorMessage').and.callThrough();
      component.deleteOption = 'DELETE_GROUP';
      fixture.detectChanges();
      component.deleteSpecifiedTime();
      expect(calendarService.displayErrorMessage).toHaveBeenCalled();
    }));

  it('should delete single hour occurrence', inject([ExcludedTimeSlotControllerService, CalendarService],
    (excludedTimeSlotControllerService: ExcludedTimeSlotControllerService, calendarService: CalendarService) => {
      spyOn(excludedTimeSlotControllerService, 'saveUsingPOST_1').and.callThrough();
      spyOn(calendarService, 'displayDeletedMessage').and.callThrough();
      component.deleteOption = 'DELETE_OCCURRENCE';
      fixture.detectChanges();
      component.deleteSpecifiedTime();
      expect(calendarService.displayDeletedMessage).toHaveBeenCalled();
    }));

  it('should fail during deleting single hour occurrence', inject([ExcludedTimeSlotControllerService, CalendarService],
    (excludedTimeSlotControllerService: ExcludedTimeSlotControllerService, calendarService: CalendarService) => {
      spyOn(excludedTimeSlotControllerService, 'saveUsingPOST_1').and.callFake((parameterName) => Observable.throw(new Error()));
      spyOn(calendarService, 'displayErrorMessage').and.callThrough();
      component.deleteOption = 'DELETE_OCCURRENCE';
      fixture.detectChanges();
      component.deleteSpecifiedTime();
      expect(calendarService.displayErrorMessage).toHaveBeenCalled();
    }));

  it('should throw error if delete option is not specified', () => {
    component.deleteOptionForm = new FormGroup({ 'deleteOption': new FormControl() });
    expect(function () { component.deleteSpecifiedTime(); }
    ).toThrowError('Unknown delete option');
  });

  it('should high light validation requirements if delete option was not set', inject([LightFieldService],
    (lightFieldService: LightFieldService) => {
      spyOn(lightFieldService, 'lightField').and.callThrough();
      fixture.detectChanges();
      component.deleteSpecifiedTime();
      expect(lightFieldService.lightField).toHaveBeenCalled();
    }));
});

class CalendarServiceStub {
  displayDeletedMessage(any) { }
  displayErrorMessage(any) { }
}

class SpecifiedTimeControllerServiceStub {
  deleteUsingDELETE_1() { return Observable.of(null); }
  deleteByGroupIdUsingDELETE() { return Observable.of(null); }

}

class ExcludedTimeSlotControllerServiceStub {
  saveUsingPOST_1(any) { return Observable.of(null); }
}

class ActivatedRouteStub {
  snapshot = {
    paramMap: {
      get(string: string) {
        switch (this.deleteOption) {
          case 'specifiedTimeId':
            return '2';
          case 'startTime':
            return '2018-04-10T17:00:00';
          case 'groupId':
            return '1';
          case 'repeatable':
            return 'true';
          default:
            return null;
        }
      }
    }
  };
}

class LightFieldServiceStub {
  lightField() { }
}
