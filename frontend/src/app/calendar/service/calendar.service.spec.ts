import { TestBed, inject } from '@angular/core/testing';

import { CalendarService } from './calendar.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SpecifiedTimeControllerService } from '../../api/services/specified-time-controller.service';
import { ExcludedTimeSlotControllerService } from '../../api/services/excluded-time-slot-controller.service';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { Observable } from 'rxjs/Observable';

describe('CalendarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [CalendarService,
        { provide: SpecifiedTimeControllerService, useClass: SpecifiedTimeControllerServiceStub },
        { provide: ExcludedTimeSlotControllerService, useClass: ExcludedTimeSlotControllerServiceStub },
        { provide: PopupService, useClass: PopupServiceStub },
      ]
    });
  });

  it('should be created', inject([CalendarService], (service: CalendarService) => {
    expect(service).toBeTruthy();
  }));
});

class SpecifiedTimeControllerServiceStub { }

class ExcludedTimeSlotControllerServiceStub { }

class PopupServiceStub { }
