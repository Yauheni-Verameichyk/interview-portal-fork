import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs';
import { DisciplineDTO } from '../../api/models';
import { DisciplineControllerService } from '../../api/services';
import { Observable } from 'rxjs/Observable';
import { DisciplineService } from '../service/discipline.service';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disciplines-list',
  templateUrl: './disciplines-list.component.html',
  styleUrls: ['./disciplines-list.component.css']
})
export class DisciplinesListComponent implements OnInit, OnDestroy {

  disciplinesList: Array<DisciplineDTO> = [];
  private readonly destroy: Subject<void> = new Subject();
  constructor(private disciplineService: DisciplineService,
    private authenticationService: AuthenticationService,
    private popupService: PopupService,
    private router: Router) { }

  ngOnInit(): void {
    (this.authenticationService.isPermissionPresent('DISCIPLINES_FILTER_READ'))
      ? this.findDisciplines('MY') : this.findDisciplines('ALL');
  }

  findDisciplines(searchOption: string): void {
    this.disciplineService.chooseRequest(searchOption)
      .takeUntil(this.destroy)
      .subscribe((disciplines) => {
        this.disciplinesList = disciplines;
      }, (error) => {
        this.popupService.displayMessage('Error during disciplines reading', this.router);
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
