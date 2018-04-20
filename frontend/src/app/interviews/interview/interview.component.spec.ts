import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewComponent } from './interview.component';
import { Router, NavigationExtras, RouterModule, ActivatedRoute } from '@angular/router';
const routerStub = {
  navigate(commands: any[], extras?: NavigationExtras) { },
  navigateByUrl(url: string) { return url; }
};
const interviewServiceStub = {
  removeInterview(id: number) { }
};
describe('InterviewComponent', () => {
  let component: InterviewComponent;
  let fixture: ComponentFixture<InterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewComponent],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: interviewServiceStub },
      ],
      imports: [ RouterModule ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewComponent);
    component = fixture.componentInstance;
    component.interview = {
      'id': 2, 'startTime': '2018-04-13T15:00:00',
      'endTime': '2018-04-13T17:00:00',
      'candidate': { 'id': 41, 'name': 'Cherly', 'surname': 'Jones' },
      'place': 'B221 K3V', 'status': 'wait',
      'interviewerSet': [{ 'id': 22, 'name': 'Gary', 'surname': 'Ortiz', 'roles': null }
        , { 'id': 12, 'name': 'Viktor', 'surname': 'Grinko', 'roles': null }]
      , 'disciplineSet': [{ 'id': 11, 'name': 'Visual basic' }
        , { 'id': 1, 'name': 'Java' }]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
