import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DisciplineDTO } from '../../api/models';
import { DisciplineWithDisciplineHeadsDTO } from '../../api/models/disciplineWithDisciplineHeadsDTO';
import { DisciplineControllerService } from '../../api/services';


@Injectable()
export class DisciplineService {

  private searchOptions = {
    MY: 'MY',
    ALL: 'ALL'
  };

  readonly createEditOptions = {
    EDIT: 'EDIT',
    CREATE_SUB_ITEM: 'CREATE_SUB_ITEM',
    VIEW: 'VIEW'
  };
  constructor(private disciplinesControlerService: DisciplineControllerService) { }

  countBackgroundColor(childLevel: number): number {
    return 240 - childLevel * 30;
  }

  convertDisciplineName(disciplineName: string): string {
    return disciplineName.trim().toUpperCase().replace(/ /g, '_');
  }

  generateCreateSubItemPermissionForDiscipline(discipline: DisciplineWithDisciplineHeadsDTO): string {
    return (discipline.parentName) ? `SUB_ITEM_CREATE_${this.convertDisciplineName(discipline.parentName)}`
      : `SUB_ITEM_CREATE_${this.convertDisciplineName(discipline.name)}`;
  }

  generateEditPermissionForDiscipline(parentName: string): string {
    return (!parentName) ? 'DISCIPLINE_EDIT' : `SUB_ITEM_EDIT_${this.convertDisciplineName(parentName)}`;
  }

  generateDeletePermissionForDiscipline(parentName: string): string {
    return (!parentName) ? 'DISCIPLINE_DELETE' : `SUB_ITEM_DELETE_${this.convertDisciplineName(parentName)}`;
  }

  chooseRequest(searchOption: string, disciplinesNumber?): Observable<DisciplineDTO[]> {
    switch (searchOption) {
      case this.searchOptions.MY:
        return this.disciplinesControlerService.findDisciplinesForUserUsingGET();
      case this.searchOptions.ALL:
        return this.disciplinesControlerService.findAllUsingGET(disciplinesNumber);
      default:
        throw new Error('Perhaps you do not know what you want');
    }
  }

  selectSearchPattern(searchDisciplines: boolean, searchSubItems: boolean): string {
    if (searchDisciplines && searchSubItems) {
      return '';
    }
    if (searchDisciplines && !searchSubItems) {
      return ';parentId=null';
    }
    if (!searchDisciplines && searchSubItems) {
      return ';parentId<>null';
    }
    throw new Error();
  }
}
