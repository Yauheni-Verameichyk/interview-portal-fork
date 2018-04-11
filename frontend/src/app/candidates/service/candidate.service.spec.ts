import { TestBed, inject } from '@angular/core/testing';

import { CandidateService } from './candidate.service';
import { Router, NavigationExtras } from '@angular/router';
import { CandidateControllerService } from '../../api/services/candidate-controller.service';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';


const routerStub = {
  navigate(commands: any[], extras?: NavigationExtras) { },
  navigateByUrl(url: string) { return url; }
};
const candidateControllerServiceStub = {

};
const popupServiceStub = {

};
describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CandidateService,
        { provide: Router, useValue: routerStub },
        {provide: CandidateControllerService, useValue: candidateControllerServiceStub},
        {provide: PopupService, useValue: popupServiceStub}
      ]
    });
  });

  it('should be created', inject([CandidateService], (service: CandidateService) => {
    expect(service).toBeTruthy();
  }));
});
