import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimePickerComponent } from './date-time-picker.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

describe('DateTimePickerComponent', () => {
  let component: DateTimePickerComponent;
  let fixture: ComponentFixture<DateTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbDatepickerModule.forRoot(),
        NgbTimepickerModule.forRoot(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DateTimePickerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
