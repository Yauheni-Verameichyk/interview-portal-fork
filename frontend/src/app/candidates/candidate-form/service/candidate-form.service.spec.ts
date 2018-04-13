import { TestBed, inject } from '@angular/core/testing';

import { CandidateFormService } from './candidate-form.service';
import { FormValidatorService } from '../../../shared/validator/validator-form/form-validator.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { LightFieldService } from '../../../shared/validator/service/light-field.service';
import { CandidateControllerService } from '../../../api/services/candidate-controller.service';
import { CandidateService } from '../../service/candidate.service';
import { PopupService } from '../../../shared/pop-up-window/popup-service/popup.service';
const formValidatorServiceStub = {};
const routerStub = {};
const activatedRouterStub = {
  snapshot: { data: {candidate: null}}
};
const lightFieldServiceStub = {};
const candidateControllerServiceStub = {};
const candidateServiceStub = {};
const popupServiceStub = {};
describe('CandidateFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CandidateFormService,
        {provide: FormValidatorService, useValue: formValidatorServiceStub},
        {provide: Router, useValue: routerStub},
        {provide: ActivatedRoute, useValue: activatedRouterStub},
        FormBuilder,
        {provide: LightFieldService, useValue: lightFieldServiceStub},
        {provide: CandidateControllerService, useValue: candidateControllerServiceStub},
        {provide: CandidateService, useValue: candidateServiceStub},
        {provide: PopupService, useValue: popupServiceStub},
      ]
    });
  });

  it('should be created', inject([CandidateFormService], (service: CandidateFormService) => {
    expect(service).toBeTruthy();
  }));
});
