import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CandidateDTO } from '../../api/models/candidate-dto';
import { CandidateControllerService } from '../../api/services/candidate-controller.service';
import { Subject } from 'rxjs/Subject';
import { CandidateService } from '../service/candidate.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {

  constructor(public candidateService: CandidateService) { }

  ngOnInit() {
    this.candidateService.isLoaded = false;
    this.candidateService.showButtonLoad = true;
    this.candidateService.fetchCandidateList(0);
  }

  get showButtonLoad(): boolean {
    return this.candidateService.showButtonLoad;
  }

  @HostListener("window:scroll", ["$event"])
  windowScrollListener() {
    const position = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if ((position === max) && this.showButtonLoad) {
      this.candidateService.fetchCandidateList(this.candidateService.candidateList.length);
    }
  }
}
