import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Injectable()
export class LightFieldService {

  constructor() { }

  public lightArray(field: string, formGroup: FormGroup) {
    (<FormArray>formGroup.get(field)).controls.forEach((element: FormArray) => {
      this.lightField(element.controls);
    });
  }

  public lightField(controls: any) {
    Object.keys(controls)
      .forEach(controlName => controls[controlName].markAsTouched());
  }

}

export module UserControllerService {
}
