import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Candidate } from '../../../api/models/candidate';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, ValidatorFn } from '@angular/forms';
import { CandidateControllerService } from '../../../api/services/candidate-controller.service';
import { CandidateService } from '../../service/candidate.service';
import { Discipline } from '../../../api/models';
import { Subject } from 'rxjs/Subject';
import { DisciplineControllerService } from '../../../api/services';


@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css']
})
export class CandidateFormComponent implements OnInit, OnDestroy {

  @Output() displayForm = new EventEmitter();
  candidate: Candidate = new Candidate();
  public candidateForm: FormGroup;
  public displayErrorMessage: boolean = false;
  public displayMessage: boolean = false;
  public viewMessage: string;
  private readonly destroy: Subject<void> = new Subject();

  constructor(private formBuilder: FormBuilder,
    private candidateControllerService: CandidateControllerService,
    private candidateService: CandidateService) { }

  get name() { return this.candidateForm.get('name') }

  get surname() { return this.candidateForm.get('surname') }

  get phone() { return this.candidateForm.get('phoneNumber') }

  ngOnInit(): void {
    this.candidateForm = this.candidateService.initCandidateForm(this.candidateForm);
  }

  createCandidate() {
    if (this.candidateForm.valid) {
      this.candidate = this.candidateService.createObject(this.candidateForm);
      this.candidateControllerService.addUsingPOST(this.candidate)
        .takeUntil(this.destroy)
        .subscribe(body => {
          this.viewMessage = this.candidateService.messageSuccessfully;
          this.displayMessage = true;
        }, (error: any) => {
          this.viewMessage = this.candidateService.messageNotSuccessfully;
          this.displayMessage = true;
        });
    } else {
      this.displayErrorMessage = true;
      this.candidateService.displayIncorrectField(this.candidateForm);
    }
  }

  change(): void {
    this.displayForm.emit();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
