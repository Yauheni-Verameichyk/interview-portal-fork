import { Injectable } from '@angular/core';
import { Candidate } from '../../api/models/candidate';
import { FormGroup, FormArray, AbstractControl, ValidatorFn, Validators, FormBuilder } from '@angular/forms';

@Injectable()
export class CandidateService {

  readonly messageSuccessfully: string = "Candidate was successfully created !!!";
  readonly messageNotSuccessfully: string = "Could not create candidate! Try later!";
  readonly dateRegExp: RegExp = /[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/;
  readonly phoneNumberRegExp: RegExp = /^[0-9\-\+]{7,15}$/;
  
  readonly titleValidations: ValidatorFn[] = [Validators.required, Validators.minLength(4), Validators.maxLength(200)];
  readonly dateValidations: ValidatorFn[] = [Validators.required, Validators.pattern(this.dateRegExp)];

  constructor(private formBuilder: FormBuilder) { }

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
    this.checkField(formGroup.controls);
    this.checkArray('educationCandidateList', formGroup);
    this.checkArray('workCandidateList', formGroup);
    this.checkArray('disciplineList', formGroup);

  }

  private checkArray(field: string, formGroup: FormGroup) {
    (<FormArray>formGroup.get(field)).controls.forEach((element: FormArray) => {
      this.checkField(element.controls);
    });
  }

  private checkField(controls: any) {
    Object.keys(controls)
      .forEach(controlName => controls[controlName].markAsTouched());
  }

  initCandidateForm(candidateForm: FormGroup): FormGroup {
    return candidateForm = this.formBuilder.group({
      name: ['', this.titleValidations],
      surname: ['', this.titleValidations],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(this.phoneNumberRegExp),
        Validators.minLength(3)
      ]],
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
