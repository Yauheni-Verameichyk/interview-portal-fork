import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CandidateControllerService } from '../../../api/services/candidate-controller.service';
import { Subject } from 'rxjs';
import { DisciplineDTO } from '../../../api/models/discipline-dto';
import { CandidateDTO } from '../../../api/models/candidate-dto';

@Component({
  selector: 'app-interview-candidate',
  templateUrl: './interview-candidate.component.html',
  styleUrls: ['./interview-candidate.component.css']
})
export class InterviewCandidateComponent implements OnInit, OnDestroy {

  @Input() interviewForm: FormGroup;
  @Output() disciplines =  new EventEmitter<DisciplineDTO[]>();
  public candidateList: Array<CandidateDTO> = new Array<CandidateDTO>();
  private readonly destroy: Subject<void> = new Subject();
  
  constructor(private candidateControllerService: CandidateControllerService) { }

  ngOnInit() {
    this.fetchCandidateList(0);
  }

  candidadeChange() {
    let candidateId = this.interviewForm.controls.candidate.value.id;
    this.candidateList.forEach(candidate => {
      if (candidate.id === +candidateId) {
        this.disciplines.emit(candidate.disciplineList);
      }
    });
  }

  fetchCandidateList(quantity?: number) {
    if (quantity === 0) {
      this.candidateList = new Array<CandidateDTO>();
    }
    this.candidateControllerService
      .findAll(quantity)
      .takeUntil(this.destroy)
      .subscribe(candidateList => {
        if (candidateList.length !== 0) {
          this.candidateList = this.candidateList.concat(candidateList);
          this.fetchCandidateList(this.candidateList.length);
        }
      }, error => console.log(`Error in candidates list component typy error: ${error}`));
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
