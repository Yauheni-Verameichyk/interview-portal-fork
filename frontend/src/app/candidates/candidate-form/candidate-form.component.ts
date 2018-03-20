import { Component, OnInit, OnDestroy} from '@angular/core';
import { Candidate } from '../../api/models/candidate';
import { FormGroup } from '@angular/forms';
import { CandidateService } from '../service/candidate.service';
import { Router } from '@angular/router';
import { CandidateFormService } from './service/candidate-form.service';


@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css']
})
export class CandidateFormComponent implements OnInit {

  constructor(
    private candidateFormService: CandidateFormService,
    private router: Router) { }

  ngOnInit(): void {
    this.candidateFormService.initCandidateForm();
  }

  get candidateForm(): FormGroup {
    return this.candidateFormService.candidateForm;
  }

  get candidate(): Candidate {
    return this.candidateFormService.candidate;
  }

  get formTitle(): string {
    return this.candidateFormService.formTitle;
  }

  get displayErrorMessage(): boolean {
    return this.candidateFormService.displayErrorMessage;
  }

}
