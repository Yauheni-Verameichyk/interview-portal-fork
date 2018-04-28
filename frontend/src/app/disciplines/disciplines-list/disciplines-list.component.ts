import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/toPromise';

import { Component } from '@angular/core';
import { OnDestroy, OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { NavigationEnd, Router } from '@angular/router';
import { ITreeOptions } from 'angular-tree-component';
import { Subject } from 'rxjs/Subject';

import { DisciplineDTO } from '../../api/models';
import { DisciplineControllerService } from '../../api/services';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { DisciplineService } from '../service/discipline.service';

@Component({
  selector: 'app-disciplines-list',
  templateUrl: './disciplines-list.component.html',
  styleUrls: ['./disciplines-list.component.css'],
})
export class DisciplinesListComponent implements OnInit, OnDestroy {

  public isLoaded: boolean;
  disciplinesList: DisciplineDTO[] = [];
  activeFilter: string;
  activeDiscipline: DisciplineDTO;
  private readonly destroy: Subject<void> = new Subject();

  options: ITreeOptions = {
    getChildren: this.findSubItems.bind(this),
    actionMapping: {
      mouse: {
        click: this.setActiveDiscipline.bind(this),
      },
    },
  };

  constructor(
    private disciplineService: DisciplineService,
    private authenticationService: AuthenticationService,
    private popupService: PopupService,
    private router: Router,
    private disciplinesControllerService: DisciplineControllerService,
  ) { }

  ngOnInit(): void {
    this.isLoaded = false;
    this.activeFilter = this.authenticationService.isPermissionPresent('DISCIPLINES_FILTER_READ') ? 'MY' : 'ALL';
    this.findDisciplines(this.activeFilter, this.disciplinesList.length);
    this.router.events
      .takeUntil(this.destroy)
      .subscribe((e: any) => {
        if (e instanceof NavigationEnd && e.urlAfterRedirects.includes('popup:message')) {
          this.findDisciplines(this.activeFilter, this.disciplinesList.length);
        }
      });
  }

  findDisciplines(activeFilter: string, disciplinesNumber: number): void {
    this.disciplineService.chooseRequest(activeFilter, disciplinesNumber)
      .takeUntil(this.destroy)
      .subscribe((disciplines) => {
        this.isLoaded = true;
        this.disciplinesList = disciplines;
        if (this.activeDiscipline) {
          this.readDiscipline(this.activeDiscipline.id);
        }
      }, (error) => {
        this.popupService.displayMessage('Error during disciplines reading', this.router);
      });
  }

  readDiscipline(disciplineId: number): void {
    this.disciplinesControllerService.findByIdUsingGET(disciplineId)
      .takeUntil(this.destroy)
      .subscribe(
        (discipline) => {
          this.activeDiscipline = discipline;
        }, (error) => {
          this.popupService.displayMessage('Error during discipline reading', this.router);
        },
    );
  }

  findSubItems(node: any): Promise<DisciplineDTO[]> {
    return this.disciplinesControllerService.findSubItemsUsingGET(node.id).toPromise();
  }

  setActiveDiscipline(tree: any, node, event): void {
    this.readDiscipline(node.id);
  }

  receiveDisciplinesFromSearch(disciplines: DisciplineDTO[]): void {
    this.activeFilter = null;
    this.disciplinesList = disciplines;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
