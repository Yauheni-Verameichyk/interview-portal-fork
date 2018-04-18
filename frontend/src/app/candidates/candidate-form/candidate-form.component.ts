import { Component, OnInit, OnDestroy} from '@angular/core';
import { Candidate } from '../../api/models/candidate';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidateFormService } from './service/candidate-form.service';


@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css'],
  providers: [ CandidateFormService ]
})
export class CandidateFormComponent implements OnInit, OnDestroy {

  constructor(
    private candidateFormService: CandidateFormService,
    private router: Router) { }

  ngOnInit(): void {
    this.candidateFormService.initCandidateForm();
    document.body.style.overflowY = 'hidden';
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

  ngOnDestroy(): void {
    document.body.style.overflowY = 'scroll';
  }

}
