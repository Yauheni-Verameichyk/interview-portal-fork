import { Injectable } from '@angular/core';
import { Candidate } from '../../api/models/candidate';
import { FormGroup, FormArray, AbstractControl, ValidatorFn, Validators, FormBuilder } from '@angular/forms';
import { FormValidatorService } from '../../shared/validator/validator-form/form-validator.service';
import { LightFieldService } from '../../shared/validator/service/light-field.service';

@Injectable()
export class CandidateService {

  readonly messageSuccessfully: string = "Candidate was successfully created !!!";
  readonly messageNotSuccessfully: string = "Could not create candidate! Try later!";
  readonly messageDisciplineNotSelected: string = "Discipline not selected!!!";
  
  readonly titleValidations: ValidatorFn[] = [Validators.required, Validators.maxLength(200)];
  readonly dateValidations: ValidatorFn[] = [Validators.required, this.formValidator.dateValidator()];

  constructor(private formBuilder: FormBuilder,
              private formValidator: FormValidatorService,
              private lightFieldService: LightFieldService) { }

  createObject(formGroup: FormGroup): Candidate {
    const candidate: Candidate = new Candidate();
    const controls = formGroup.controls;
    Object.keys(controls)
      .forEach(controlName => {
        candidate[controlName] = controls[controlName].value;
      });
    return candidate;
  }

  displayIncorrectField(formGroup: FormGroup): void {
    this.lightFieldService.lightField(formGroup.controls);
    this.lightFieldService.lightArray('educationCandidateList', formGroup);
    this.lightFieldService.lightArray('workCandidateList', formGroup);
    this.lightFieldService.lightArray('disciplineList', formGroup);

  }

  initCandidateForm(candidateForm: FormGroup): FormGroup {
    return candidateForm = this.formBuilder.group({
      name: ['', this.titleValidations],
      surname: ['', this.titleValidations],
      phoneNumber: ['', [Validators.required, this.formValidator.phoneValidator()]],
      workCandidateList: this.formBuilder.array([this.initWorkForm()]),
      educationCandidateList: this.formBuilder.array([this.initEducationForm()]),
      disciplineList: this.formBuilder.array([this.initDisciplineForm()])
    });
  }

  initDisciplineForm(): any {
    return this.formBuilder.group({
      id: ['', Validators.required]
    });
  }

  initWorkForm() {
    return this.formBuilder.group({
      nameCompany: ['', this.titleValidations],
      position: ['', this.titleValidations],
      dateStart: ['', this.dateValidations],
      dateEnd: ['', this.dateValidations]
    });
  }

  initEducationForm() {
    return this.formBuilder.group({
      nameInstitution: ['', this.titleValidations],
      profession: ['', this.titleValidations],
      dateStart: ['', this.dateValidations],
      dateEnd: ['', this.dateValidations]
    });
  }

  removeRow(index: number, title: string, candidateForm: FormGroup) {
    const control = <FormArray>candidateForm.controls[title];
    control.removeAt(index);
  }

}
