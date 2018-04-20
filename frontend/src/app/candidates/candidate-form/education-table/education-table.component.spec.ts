import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationTableComponent } from './education-table.component';
import { CandidateFormService } from '../service/candidate-form.service';
import { FormValidatorService } from '../../../shared/validator/validator-form/form-validator.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
const candidateFormServiceStub = {};
xdescribe('EducationTableComponent', () => {
  let component: EducationTableComponent;
  let fixture: ComponentFixture<EducationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationTableComponent ],
      imports: [ReactiveFormsModule, FormsModule, SharedModule],
      providers: [
        {provide: CandidateFormService, useValue: candidateFormServiceStub},
        {provide: FormValidatorService, useValue: candidateFormServiceStub},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationTableComponent);
    component = fixture.componentInstance;
    component.candidateForm = new FormGroup(
      {
        candidateEducationList: new FormControl('')
      }
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
