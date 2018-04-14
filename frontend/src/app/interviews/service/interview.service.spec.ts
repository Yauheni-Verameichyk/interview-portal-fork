import { TestBed, inject } from '@angular/core/testing';

import { InterviewService } from './interview.service';
import { Router, NavigationExtras } from '@angular/router';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { InterviewControllerService } from '../../api/services/interview-controller.service';
const routerStub = {
  navigate(commands: any[], extras?: NavigationExtras) { },
  navigateByUrl(url: string) { return url; }
};
const interviewControllerServiceStub = {
  findAllUsingGET_2(quantity: number){},
  deleteUsingDELETE_2(id: number){}
};
const popupServiceStub = {};
describe('CandidateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InterviewService,
        {provide: Router, useValue: routerStub},
        {provide: InterviewControllerService, useValue: interviewControllerServiceStub},
        {provide: PopupService, useValue: popupServiceStub}
      ]
    });
  });

  it('should be created', inject([InterviewService], (service: InterviewService) => {
    expect(service).toBeTruthy();
  }));
});
