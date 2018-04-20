import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CandidateDTO } from '../../api/models/candidate-dto';
import { CandidateControllerService } from '../../api/services/candidate-controller.service';
import { Subject } from 'rxjs/Subject';
import { Router, NavigationEnd } from '@angular/router';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit, OnDestroy {

  public candidateList: Array<CandidateDTO> = new Array<CandidateDTO>();
  public isNecessaryLoadding: boolean = true;
  public isLoaded: boolean = false;
  private readonly destroy: Subject<void> = new Subject();
  private isLoadingForScrollEvent: boolean = true;

  constructor(private router: Router,
    private candidateControllerService: CandidateControllerService,
    private popupService: PopupService) { }

  ngOnInit() {
    this.updateCandidateList();
    this.router.events
      .takeUntil(this.destroy)
      .subscribe((e: any) => {
        if (e instanceof NavigationEnd && e.urlAfterRedirects.includes('popup:message')) {
          this.updateCandidateList();
        }
      });
  }

  @HostListener("window:scroll", ["$event"])
  windowScrollListener() {
    const position = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if ((position === max) && this.isNecessaryLoadding && this.isLoadingForScrollEvent) {
      this.fetchCandidateList(this.candidateList.length);
    }
  }

  fetchCandidateList(quantity?: number) {
    if (quantity === 0) {
      this.candidateList = new Array<CandidateDTO>();
    }
    this.candidateControllerService
      .findAll(quantity)
      .takeUntil(this.destroy)
      .subscribe(candidateList => {
        this.isLoadingForScrollEvent = true;
        if (candidateList.length !== 0) {
          this.candidateList = this.candidateList.concat(candidateList);
          this.isLoaded = true;
        } else {
          this.isNecessaryLoadding = false;
        }
      }, error => console.log(`Error in candidates list component typy error: ${error}`));
  }

  updateCandidateList() {
    this.isLoaded = false;
    this.isNecessaryLoadding = true;
    this.isLoadingForScrollEvent = false;
    this.fetchCandidateList(0);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
