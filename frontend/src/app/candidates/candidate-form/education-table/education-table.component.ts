import { Component,  Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { CandidateFormService } from '../service/candidate-form.service';

@Component({
  selector: 'app-education-table',
  templateUrl: './education-table.component.html',
  styleUrls: ['./education-table.component.css']
})
export class EducationTableComponent {

  @Input() candidateForm: FormGroup;

  constructor(private candidateFormService: CandidateFormService) {}

  additionEducation(): void {
    const control = <FormArray>this.candidateForm.controls['candidateEducationList'];
    control.push(this.candidateFormService.initEducationForm());
  }

  remove(index: number, title: string) {
    this.candidateFormService.removeRow(index, title, this.candidateForm);
  }

}
