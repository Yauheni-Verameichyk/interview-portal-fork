import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/takeUntil';

import { Component, EventEmitter, Output } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { DisciplineDTO } from '../../api/models/discipline';
import { DisciplineControllerService } from '../../api/services/discipline-controller.service';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { DisciplineService } from '../service/discipline.service';

@Component({
  selector: 'app-discipline-search',
  templateUrl: './discipline-search.component.html',
  styleUrls: ['./discipline-search.component.css']
})
export class DisciplineSearchComponent implements OnDestroy {
  showFilter = false;
  searchSubItems = false;
  searchDisciplines = true;
  private debounceTime: Subject<string> = new Subject();
  @Output() private emitDisciplines = new EventEmitter<DisciplineDTO[]>();
  private readonly destroy: Subject<void> = new Subject();
 
  constructor(
    private disciplineControllerService: DisciplineControllerService,
    private disciplineService: DisciplineService,
    private popupService: PopupService,
    private router: Router,
  ) {
    this.debounceTime.debounceTime(350)
      .takeUntil(this.destroy)
      .subscribe(((searchString) => this.readDisciplines(searchString)));
  }

  searchByName(disciplineName: string): void {
    if (disciplineName.length > 0 && (this.searchDisciplines || this.searchSubItems)) {
      const searchString = `name:${disciplineName}${this.disciplineService.selectSearchPattern(this.searchDisciplines,
        this.searchSubItems)}`;
      this.debounceTime.next(searchString);
    }
  }

  readDisciplines(searchString: string): void {
    this.disciplineControllerService.findDisciplinesWithParametersUsingGET(searchString)
      .takeUntil(this.destroy)
      .subscribe((disciplines) => {
        this.emitDisciplines.emit(disciplines);
      }, (error) => {
        this.popupService.displayMessage('Error during disciplines reading', this.router);
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
