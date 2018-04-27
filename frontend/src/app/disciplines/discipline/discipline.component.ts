import { Component, OnInit, Input } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs';
import { DisciplineDTO } from '../../api/models';
import { DisciplineService } from '../service/discipline.service';
import { DisciplineControllerService } from '../../api/services';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { DisciplineWithDisciplineHeadsDTO } from '../../api/models/disciplineWithDisciplineHeadsDTO';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.css']
})
export class DisciplineComponent implements OnDestroy {

  @Input() public discipline: DisciplineWithDisciplineHeadsDTO;
  private readonly destroy: Subject<void> = new Subject();

  constructor(
    private disciplinesControllerService: DisciplineControllerService,
    private disciplineService: DisciplineService,
    private router: Router,
    private popupService: PopupService) { }

  deleteDiscipline(id: number): void {
    this.disciplinesControllerService.deleteDisciplineUsingDELETE(id)
      .takeUntil(this.destroy)
      .subscribe((success) => {
        this.router.navigate(['discipline']);
        this.popupService.displayMessage('Discipline was deleted', this.router);
      }, (error) => {
        this.popupService.displayMessage('Error during discipline deleting', this.router);
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
