import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationTableComponent } from './education-table.component';

describe('EducationTableComponent', () => {
  let component: EducationTableComponent;
  let fixture: ComponentFixture<EducationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
