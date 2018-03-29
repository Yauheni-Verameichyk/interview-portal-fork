import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDisciplineComponent } from './assign-discipline.component';

describe('AssignDisciplineComponent', () => {
  let component: AssignDisciplineComponent;
  let fixture: ComponentFixture<AssignDisciplineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignDisciplineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
