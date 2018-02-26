import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListBean } from '../../api/models/list-bean';
import { CandidateDTO } from '../../api/models/candidate-dto';
import { CandidateControllerService } from '../../api/services/candidate-controller.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit, OnDestroy {

  private readonly unsubscribe: Subject<void> = new Subject();
  candidatesPage: ListBean<CandidateDTO>;
  content: Array<CandidateDTO>;

  constructor(private candidateControllerService: CandidateControllerService) { }

  ngOnInit() {
    this.candidateControllerService
      .findCandidatePage()
      .takeUntil(this.unsubscribe)
      .subscribe(candidatesPage => {
        this.candidatesPage = candidatesPage;
        this.content = candidatesPage.content;
      },
    error => {
      console.log(`Error in candidates list component typy error: ${error}`)
    });

  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
