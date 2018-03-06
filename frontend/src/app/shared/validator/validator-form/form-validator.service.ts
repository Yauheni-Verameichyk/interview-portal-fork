import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, Validators } from '@angular/forms';

@Injectable()
export class FormValidatorService {

  constructor() { }

  public userNameValidator(): ValidatorFn {
    const pattern: RegExp = /^[\w\.\$@\*\!]{5,30}$/;
    return (control: AbstractControl): { [key: string]: any } => {
      if (!(control.dirty || control.touched)) {
        return null;
      } else {
        return pattern.test(control.value) ? null : { custom: `Min length:5, can't contain whitespaces & special symbols.` };
      }
    };
  }
  public langthValidator(): ValidatorFn[] {
    return [Validators.required, Validators.minLength(6), Validators.maxLength(20)]
  }

  public phoneValidator(): ValidatorFn {
    const pattern: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return (control: AbstractControl): { [key: string]: any } => {
      if (!(control.dirty || control.touched)) {
        return null;
      } else {
        return pattern.test(control.value) ? null : { custom: `Invalid phone number` };
      }
    };
  }

  public dateValidator(): ValidatorFn {
    const pattern: RegExp = /[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/im;
    return (control: AbstractControl): { [key: string]: any } => {
      if (!(control.dirty || control.touched)) {
        return null;
      } else {
        return pattern.test(control.value) ? null : { custom: `Invalid date` };
      }
    };
  }

}
