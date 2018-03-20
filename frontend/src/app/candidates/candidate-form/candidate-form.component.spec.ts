import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateFormComponent } from './candidate-form.component';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CandidateFormService } from './service/candidate-form.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormValidatorService } from '../../shared/validator/validator-form/form-validator.service';
import { LightFieldService } from '../../shared/validator/service/light-field.service';
import { CandidateControllerService } from '../../api/services/candidate-controller.service';
import { CandidateService } from '../service/candidate.service';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { Candidate } from '../../api/models/candidate';

describe('CandidateFormComponent', () => {
  let component: CandidateFormComponent;
  let fixture: ComponentFixture<CandidateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule, BrowserModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CandidateFormComponent],
      providers: [
        { provide: CandidateFormService, useClass: CandidateFormServiceStub },
      ]
    })
      .compileComponents();
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

class CandidateFormServiceStub {
  public candidate: Candidate = new Candidate();
  private formBuilder = new FormBuilder();
  private formValidator = new FormValidatorService();
  constructor() { }
  public candidateForm: FormGroup;

  initCandidateForm() {
    this.candidateForm = this.formBuilder.group({
      id: [this.candidate.id],
      name: [this.candidate.name, this.formValidator.lengthValidator()],
      surname: [this.candidate.surname, this.formValidator.lengthValidator()],
      phoneNumber: [this.candidate.phoneNumber, [this.formValidator.phoneValidator()]],
    });
  }
}
