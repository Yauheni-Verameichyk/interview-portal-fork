import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarFormComponent } from './calendar-form.component';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { CalendarService } from '../service/calendar.service';
import { SpecifiedTimeControllerService } from '../../api/services/specified-time-controller.service';
import { ExcludedTimeSlotControllerService } from '../../api/services/excluded-time-slot-controller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LightFieldService } from '../../shared/validator/service/light-field.service';
import { NO_ERRORS_SCHEMA, Component, Input, forwardRef } from '@angular/core';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';
import { SpecifiedTime } from '../../api/models/specified-time';
import { CustomValidators } from 'ng4-validators';

describe('CalendarFormComponent', () => {
  let component: CalendarFormComponent;
  let fixture: ComponentFixture<CalendarFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, FormsModule, SharedModule],
      declarations: [CalendarFormComponent, MockComponent],
      schemas: [NO_ERRORS_SCHEMA],
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
    fixture = TestBed.createComponent(CalendarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

export const DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MockComponent),
  multi: true
};

@Component({
  selector: 'mwl-demo-utils-date-time-picker',
  template: '<p>Mock Product Settings Component</p>',
  providers: [DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR]
})
class MockComponent {
  @Input() placeholder: string;
  @Input() showTime;
  date: Date;

  writeValue(date: Date): void { }

  registerOnChange(fn: any): void { }

  registerOnTouched(fn: any): void { }
}

class CalendarServiceStub {
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

  convertDTOToSpecifiedTime(any) {
    return null;
  }

  getCurrentDate(): Date {
    const date = new Date();
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
  }

  setValidatorsForNonRepeatable(any) { }

  updateEndTimeValidator(any) { }
}

class SpecifiedTimeControllerServiceStub {
  findByIdUsingGET_3(any) {
    return Observable.of(null);
  }
}

class ExcludedTimeSlotControllerServiceStub { }

class ActivatedRouteStub {
  snapshot = {
    paramMap: {
      get(string: string) {
        return string === 'specifiedTimeId' ? '0' : null;
      }
    }
  };
}

class LightFieldServiceStub { }
