import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewListComponent } from './interview-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { InterviewService } from '../service/interview.service';

const interviewServiceStub = {
  fetchInterviewList(){}
};
describe('InterviewListComponent', () => {
  let component: InterviewListComponent;
  let fixture: ComponentFixture<InterviewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewListComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: InterviewService, useValue: interviewServiceStub }
      ]})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
