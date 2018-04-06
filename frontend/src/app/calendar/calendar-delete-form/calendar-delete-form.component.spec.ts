import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDeleteFormComponent } from './calendar-delete-form.component';

describe('CalendarDeleteFormComponent', () => {
  let component: CalendarDeleteFormComponent;
  let fixture: ComponentFixture<CalendarDeleteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarDeleteFormComponent ]
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
