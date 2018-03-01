import { Injectable } from '@angular/core';
import { DisciplineControllerService } from '../../api/services';
import { Observable } from 'rxjs/Observable';
import { Discipline } from '../../api/models';
import { DisciplineDTO } from '../../api/models/disciplineDTO';

@Injectable()
export class DisciplineService {

  private searchOptions = {
    MY: 'MY',
    ALL: 'ALL'
  };

  readonly createEditOptions = {
    EDIT: 'EDIT',
    CREATE_SUB_ITEM: 'CREATE_SUB_ITEM'
  };
  constructor(private disciplinesControlerService: DisciplineControllerService) { }

  countBackgroundColor(childLevel: number): number {
    return 240 - childLevel * 30;
  }

  convertDisciplineName(disciplineName: string): string {
    return disciplineName.trim().toUpperCase().replace(/ /g, '_');
  }

  generateEditPermissionForDiscipline(disciplineName: string, childLevel: number): string {
    return (childLevel === 0) ? 'DISCIPLINE_EDIT' : `SUB_ITEM_EDIT_${disciplineName}`;
  }

  generateDeletePermissionForDiscipline(disciplineName: string, childLevel: number): string {
    return (childLevel === 0) ? 'DISCIPLINE_DELETE' : `SUB_ITEM_DELETE_${disciplineName}`;
  }

  chooseRequest(searchOption: string): Observable<Discipline[]> {
    switch (searchOption) {
      case this.searchOptions.MY:
        return this.disciplinesControlerService.findDisciplinesForUserUsingGET();
      case this.searchOptions.ALL:
        return this.disciplinesControlerService.findAllUsingGET();
      default:
        Observable.throw('Perhaps you do not know what you want');
    }
  }
}
