import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { CandidateService } from '../../../service/candidate.service';

@Component({
  selector: 'app-education-table',
  templateUrl: './education-table.component.html',
  styleUrls: ['./education-table.component.css']
})
export class EducationTableComponent {

  @Input() candidateForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private candidateService: CandidateService) {}

  additionEducation(): void {
    const control = <FormArray>this.candidateForm.controls['educationCandidateList'];
    control.push(this.candidateService.initEducationForm());
  }
  
  remove(index: number, title: string) {
    this.candidateService.removeRow(index, title, this.candidateForm);
  }

}
