import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTableComponent } from './work-table.component';
import { CandidateFormService } from '../service/candidate-form.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { Input } from '@angular/core';
import { FormValidatorService } from '../../../shared/validator/validator-form/form-validator.service';
const candidateFormServiceStub = {};

describe('WorkTableComponent', () => {
  let component: WorkTableComponent;
  let fixture: ComponentFixture<WorkTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkTableComponent ],
      imports: [ReactiveFormsModule, FormsModule, SharedModule],
      providers: [
        {provide: CandidateFormService, useValue: candidateFormServiceStub},
        {provide: FormValidatorService, useValue: candidateFormServiceStub},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkTableComponent);
    component = fixture.componentInstance;
    component.candidateForm = new FormGroup(
      {
        candidateWorkList: new FormControl('')
      }
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
