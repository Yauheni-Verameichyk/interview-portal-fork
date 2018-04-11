import { Component, Output, EventEmitter } from '@angular/core';
import { DisciplineControllerService } from '../../api/services/discipline-controller.service';
import { DisciplineDTO } from '../../api/models/discipline';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { Router } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { DisciplineService } from '../service/discipline.service';

@Component({
  selector: 'app-discipline-search',
  templateUrl: './discipline-search.component.html',
  styleUrls: ['./discipline-search.component.css']
})
export class DisciplineSearchComponent implements OnDestroy {
  isSearchShown = false;
  searchSubItems = false;
  searchDisciplines = true;
  disciplinesList: Array<DisciplineDTO> = [];
  @Output() private emitDisciplines = new EventEmitter<DisciplineDTO[]>();
  private readonly destroy: Subject<void> = new Subject();
  constructor(
    private disciplineControllerService: DisciplineControllerService,
    private disciplineService: DisciplineService,
    private popupService: PopupService,
    private router: Router
  ) { }

  searchByName(disciplineName: string): void {
    if (disciplineName.length > 0 && (this.searchDisciplines || this.searchSubItems)) {
      const searchString = `name:${disciplineName}${this.disciplineService.selectSearchPattern(this.searchDisciplines,
        this.searchSubItems)}`;
      this.disciplineControllerService.findDisciplinesWithParametersUsingGET(searchString)
        .subscribe(disciplines => {
          this.disciplinesList = disciplines;
          this.emitDisciplines.emit(disciplines);
        }, error => {
          this.popupService.displayMessage('Error during disciplines reading', this.router);
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
