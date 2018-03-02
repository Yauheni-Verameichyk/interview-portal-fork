import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { CandidateService } from '../../../service/candidate.service';

@Component({
  selector: 'app-work-table',
  templateUrl: './work-table.component.html',
  styleUrls: ['./work-table.component.css']
})
export class WorkTableComponent {

  @Input() candidateForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private candidateService: CandidateService) { }

  remove(index: number, title: string) {
    this.candidateService.removeRow(index, title, this.candidateForm);
  }

  additionWork(): void {
    const control = <FormArray>this.candidateForm.controls['workCandidateList'];
    control.push(this.candidateService.initWorkForm());
  }

}
