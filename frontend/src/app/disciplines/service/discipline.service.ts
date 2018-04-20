import { Injectable } from '@angular/core';
import { DisciplineControllerService } from '../../api/services';
import { Observable } from 'rxjs/Observable';
import { DisciplineDTO } from '../../api/models';


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

  generateEditPermissionForDiscipline(disciplineName: string, childLevel: number): string {
    return (childLevel === 0) ? 'DISCIPLINE_EDIT' : `SUB_ITEM_EDIT_${disciplineName}`;
  }

  generateDeletePermissionForDiscipline(disciplineName: string, childLevel: number): string {
    return (childLevel === 0) ? 'DISCIPLINE_DELETE' : `SUB_ITEM_DELETE_${disciplineName}`;
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
      return ',parentId=null';
    }
    if (!searchDisciplines && searchSubItems) {
      return ',parentId<>null';
    }
    throw new Error();
  }
}
