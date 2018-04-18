import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { InterviewControllerService } from '../../api/services/interview-controller.service';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { InterviewDTO } from '../../api/models/interview-dto';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css']
})
export class InterviewListComponent implements OnInit, OnDestroy {

  public interviewList: Array<InterviewDTO> = new Array<InterviewDTO>();
  public isLoaded: boolean = false;
  public isNecessaryLoadding: boolean = true;
  private readonly destroy: Subject<void> = new Subject();
  private isLoadingForScrollEvent: boolean = true;

  constructor(
    private router: Router,
    private interviewControllerService: InterviewControllerService,
    private popupService: PopupService) { }

  ngOnInit() {
    this.updateInterviewList();
    this.router.events
      .takeUntil(this.destroy)
      .subscribe((e: any) => {
        if (e instanceof NavigationEnd && e.urlAfterRedirects.includes('popup:message')) {
          this.updateInterviewList();
        }
      });
  }

  @HostListener("window:scroll", ["$event"])
  windowScrollListener() {
    const position = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if ((position === max) && this.isNecessaryLoadding && this.isLoadingForScrollEvent) {
      this.fetchInterviewList(this.interviewList.length);
    }
  }

  fetchInterviewList(quantity?: number) {
    if (quantity === 0) {
      this.interviewList = new Array<InterviewDTO>();
    }
    this.interviewControllerService
      .findAllUsingGET_2(quantity)
      .takeUntil(this.destroy)
      .subscribe(interviewList => {
        this.isLoadingForScrollEvent = true;
        if (interviewList.length !== 0) {
          this.interviewList = this.interviewList.concat(interviewList);
          this.isLoaded = true;
        } else {
          this.isNecessaryLoadding = false;
        }
      }, error => console.log(`Error interview list component type error: ${error}`));
  }

  updateInterviewList() {
    this.isLoaded = false;
    this.isNecessaryLoadding = true;
    this.isLoadingForScrollEvent = false;
    this.fetchInterviewList(0);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
