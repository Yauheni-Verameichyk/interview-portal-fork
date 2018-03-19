import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CandidateDTO } from '../../api/models/candidate-dto';
import { CandidateService } from '../service/candidate.service';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { Router } from '@angular/router';
import { CandidateControllerService } from '../../api/services/candidate-controller.service';
import { Subject } from 'rxjs';

@Component({
  selector: '[app-candidate]',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent{

  @Input() candidate: CandidateDTO; 
  private readonly destroy: Subject<void> = new Subject();

  constructor(private candidateService: CandidateService) { }

  removeCandidate(id: number) {
    this.candidateService.removeCandidate(id);
  }

}
