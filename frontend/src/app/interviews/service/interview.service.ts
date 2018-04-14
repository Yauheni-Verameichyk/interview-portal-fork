import { Injectable } from '@angular/core';
import { InterviewDTO } from '../../api/models/interview-dto';
import { Router } from '@angular/router';
import { InterviewControllerService } from '../../api/services/interview-controller.service';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';

@Injectable()
export class InterviewService {

  public interviewList: Array<InterviewDTO> = new Array<InterviewDTO>();
  public isLoaded: boolean = false;
  public showButtonLoad: boolean = true;

  constructor(
    private router: Router,
    private interviewControllerService: InterviewControllerService,
    private popupService: PopupService) { }

  fetchInterviewList(quantity?: number) {
    if (quantity === 0) {
      this.interviewList = new Array<InterviewDTO>();
    }
    this.interviewControllerService.findAllUsingGET_2(quantity)
      .subscribe(interviewList => {
        if (interviewList.length !== 0) {
          this.interviewList = this.interviewList.concat(interviewList);
          this.isLoaded = true;
        } else {
          this.showButtonLoad = false;
        }
      }, error => console.log(`Error interview list component type error: ${error}`));
  }

  removeInterview(id: number): any {
    this.interviewControllerService.deleteUsingDELETE_2(id)
      .subscribe(body => {
        this.popupService.displayMessage("Interview successfully deleted!!!", this.router);
        this.updateInterviewList();
      }, (error: any) =>
          this.popupService.displayMessage("There was an error when deleting the interview!!!", this.router)
      );
  }

  updateInterviewList() {
    this.isLoaded = false;
    this.fetchInterviewList(0);
  }

}
