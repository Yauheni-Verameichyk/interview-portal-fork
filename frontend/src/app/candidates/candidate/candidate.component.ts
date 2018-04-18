import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CandidateDTO } from '../../api/models/candidate-dto';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { Router } from '@angular/router';
import { CandidateControllerService } from '../../api/services/candidate-controller.service';
import { Subject } from 'rxjs';

@Component({
  selector: '[app-candidate]',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnDestroy {

  @Input() candidate: CandidateDTO;
  private readonly destroy: Subject<void> = new Subject();

  constructor(
    private candidateControllerService: CandidateControllerService,
    private router: Router,
    private popupService: PopupService) { }

  removeCandidate(id: number): any {
    this.candidateControllerService.deleteUsingDELETE(id)
      .takeUntil(this.destroy)
      .subscribe(body => {
        this.popupService.displayMessage("Candidate successfully deleted!!!", this.router);
      }, (error: any) =>
          this.popupService.displayMessage("There was an error when deleting the candidate!!!", this.router)
      );
  }

  showCandidateInfo() {
    this.router.navigate([{ outlets: { popup: ['candidate-view', this.candidate.id] } }]);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
