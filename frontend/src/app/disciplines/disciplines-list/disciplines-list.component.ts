import { Component, HostListener } from '@angular/core';
import { OnDestroy, OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { DisciplineDTO } from '../../api/models';
import { DisciplineControllerService } from '../../api/services';
import { Observable } from 'rxjs/Observable';
import { DisciplineService } from '../service/discipline.service';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-disciplines-list',
  templateUrl: './disciplines-list.component.html',
  styleUrls: ['./disciplines-list.component.css']
})
export class DisciplinesListComponent implements OnInit, OnDestroy {

  public isLoaded: boolean;
  disciplinesList: Array<DisciplineDTO> = [];
  activeFilter: string;
  private readonly destroy: Subject<void> = new Subject();
  constructor(private disciplineService: DisciplineService,
    private authenticationService: AuthenticationService,
    private popupService: PopupService,
    private router: Router
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
        (this.activeFilter === 'ALL') ? this.disciplinesList.push(...disciplines) : this.disciplinesList = disciplines;
      }, (error) => {
        this.popupService.displayMessage('Error during disciplines reading', this.router);
      });
  }

  receiveDisciplinesFromSearch(disciplines: DisciplineDTO[]): void {
    this.activeFilter = null;
    this.disciplinesList = disciplines;
  }

  @HostListener('window:scroll', ['$event'])
  windowScrollListener() {
    const position = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (position === max && this.activeFilter === 'ALL') {
      this.findDisciplines(this.activeFilter, this.disciplinesList.length);
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
