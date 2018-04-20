import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { DateTimePickerComponent } from './date-time-picker.component';
import { NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
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
      providers: [
        { provide: ChangeDetectorRef, useClass: ChangeDetectorRefStub },
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
    const date = new Date();
    component.writeValue(date);
    expect(component).toBeTruthy();
  });

  it('should change time', () => {
    const spy = spyOn((component as any).cdr, 'detectChanges');
    const date = new Date();
    component.writeValue(date);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.date).toEqual(date);
  });

  it('should register callback function', () => {
    const fn = function callback() { console.log(); };
    component.registerOnChange(fn);
    expect(component['onChangeCallback']).toEqual(fn);
  });

  it('should do nothing while trying to register callback function for touched', () => {
    const fn = function callback() { console.log(); };
    component.registerOnTouched(fn);
    expect(component).toEqual(fixture.componentInstance);
  });

  it('should update date with data from form', () => {
    component.dateStruct = {year: 2018, month: 1, day: 1};
    component.timeStruct = {hour: 0, minute: 0, second: 0};
    expect(component.date).toEqual(undefined);
    component.updateDate();
    expect(component.date).toEqual(new Date('2018-01-01T00:00:00'));
  });

  it('should update time with data from form', () => {
    component.dateStruct = {year: 2018, month: 1, day: 1};
    expect(component.date).toEqual(undefined);
    component.updateDate();
    component.timeStruct = {hour: 11, minute: 11, second: 11};
    component.updateTime();
    expect(component.date).toEqual(new Date('2018-01-01T11:11:11'));
  });
});

class ChangeDetectorRefStub {
  detectChanges() { }
}
