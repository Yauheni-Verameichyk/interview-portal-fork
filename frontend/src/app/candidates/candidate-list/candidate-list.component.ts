import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CandidateDTO } from '../../api/models/candidate-dto';
import { CandidateControllerService } from '../../api/services/candidate-controller.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit, OnDestroy {

  private readonly unsubscribe: Subject<void> = new Subject();
  candidateList: Array<CandidateDTO> = new Array<CandidateDTO>();
  showButtonLoad: boolean = true;
  showForm: boolean = false;

  constructor(private candidateControllerService: CandidateControllerService) { }

  ngOnInit() {
    this.loadCandidateList();
  }

  @HostListener("window:scroll", ["$event"])
  windowScrollListener() {
    let position = document.documentElement.scrollTop;
    let max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if ((position == max) && this.showButtonLoad) {
      this.loadCandidateList(this.candidateList.length);
    }
  }

  loadCandidateList(quantity?: number) {
    this.candidateControllerService
      .findAll(quantity)
      .takeUntil(this.unsubscribe)
      .subscribe(candidateList => {
        if (candidateList.length !== 0) {
          this.candidateList = this.candidateList.concat(candidateList);
        } else {
          this.showButtonLoad = false;
        }
      },
        error => {
          console.log(`Error in candidates list component typy error: ${error}`)
        });
  }

  displayForm() {
    this.showForm = !this.showForm;
    if(this.showForm === false) {
      this.candidateList =  new Array<CandidateDTO>();
      this.loadCandidateList(0);
      this.showButtonLoad = true;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
