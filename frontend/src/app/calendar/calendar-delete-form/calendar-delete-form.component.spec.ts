import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDeleteFormComponent } from './calendar-delete-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CalendarService } from '../service/calendar.service';
import { SpecifiedTimeControllerService } from '../../api/services/specified-time-controller.service';
import { ExcludedTimeSlotControllerService } from '../../api/services/excluded-time-slot-controller.service';
import { LightFieldService } from '../../shared/validator/service/light-field.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class CalendarServiceStub { }

class SpecifiedTimeControllerServiceStub { }

class ExcludedTimeSlotControllerServiceStub { }

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

class LightFieldServiceStub { }
