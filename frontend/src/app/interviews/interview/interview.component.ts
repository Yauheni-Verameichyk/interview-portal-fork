import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { InterviewDTO } from '../../api/models/interview-dto';
import { Router } from '@angular/router';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { InterviewControllerService } from '../../api/services/interview-controller.service';
import { Subject } from 'rxjs';

@Component({
  selector: '[app-interview]',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnDestroy {

  @Input() interview: InterviewDTO;
  private readonly destroy: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private interviewControllerService: InterviewControllerService,
    private popupService: PopupService) { }

  removeInterview(id: number): any {
    this.interviewControllerService
    .deleteUsingDELETE_2(id)
    .takeUntil(this.destroy)
      .subscribe(body => {
        this.popupService.displayMessage("Interview successfully deleted!!!", this.router);
      }, (error: any) =>
          this.popupService.displayMessage("There was an error when deleting the interview!!!", this.router)
      );
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
