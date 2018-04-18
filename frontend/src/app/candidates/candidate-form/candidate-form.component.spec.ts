import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateFormComponent } from './candidate-form.component';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CandidateFormService } from './service/candidate-form.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormValidatorService } from '../../shared/validator/validator-form/form-validator.service';
import { LightFieldService } from '../../shared/validator/service/light-field.service';
import { CandidateControllerService } from '../../api/services/candidate-controller.service';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { Candidate } from '../../api/models/candidate';
const formValidatorServiceStub = {
  lengthValidator() { return true; },
  phoneValidator() { return true; },
  dateValidator() { return true; }
};
const candidateFormServiceStub = {
  initCandidateForm(): void {
  }, candidateForm :  new FormGroup(
    {
      name: new FormControl(''),
      surname: new FormControl(''),
      phoneNumber: new FormControl(''),
      candidateWorkList: new FormControl(''),
      candidateEducationList: new FormControl(''),
      disciplineList: new FormControl(''),
    }
  )
};
const lightFieldServiceStub = {};
const candidateControllerServiceStub = {};
const candidateServiceStub = {};
const popupServiceStub = {};
describe('CandidateFormComponent', () => {
  let component: CandidateFormComponent;
  let fixture: ComponentFixture<CandidateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule, BrowserModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CandidateFormComponent],
      providers: [
        { provide: CandidateFormService, useValue: candidateFormServiceStub },
        { provide: FormValidatorService, useValue: formValidatorServiceStub },
        { provide: LightFieldService, useValue: lightFieldServiceStub },
        { provide: CandidateControllerService, useValue: candidateControllerServiceStub },
        { provide: PopupService, useValue: popupServiceStub },
      ],
    }
  );
  TestBed.overrideComponent(CandidateFormComponent, {
    set: {
      providers: [
        { provide: CandidateFormService, useValue: candidateFormServiceStub },
        { provide: FormValidatorService, useValue: formValidatorServiceStub },
        { provide: LightFieldService, useValue: lightFieldServiceStub },
        { provide: CandidateControllerService, useValue: candidateControllerServiceStub },
        { provide: PopupService, useValue: popupServiceStub },
      ]
    }
  }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
