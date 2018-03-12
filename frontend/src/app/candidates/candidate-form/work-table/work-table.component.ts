import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { CandidateService } from '../../service/candidate.service';
import { CandidateFormService } from '../service/candidate-form.service';

@Component({
  selector: 'app-work-table',
  templateUrl: './work-table.component.html',
  styleUrls: ['./work-table.component.css']
})
export class WorkTableComponent {

  @Input() candidateForm: FormGroup;

  constructor(private candidateFormService: CandidateFormService) { }

  remove(index: number, title: string) {
    this.candidateFormService.removeRow(index, title, this.candidateForm);
  }

  additionWork(): void {
    const control = <FormArray>this.candidateForm.controls['workCandidateList'];
    control.push(this.candidateFormService.initWorkForm());
  }

}
