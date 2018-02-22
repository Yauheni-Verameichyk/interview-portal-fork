import { Injectable } from '@angular/core';

@Injectable()
export class DisciplineService {

  constructor() { }

  countBackgroundColor(childLevel: number): number {
    return 240 - childLevel * 30;
  }

  convertDisciplineName(disciplineName: string): string {
    return disciplineName.trim().toUpperCase().replace(/ /g, "_");
  }

  generateEditPermissionForDiscipline(disciplineName: string, childLevel: number): string {
    return (childLevel == 0) ? 'DISCIPLINE_EDIT' : `SUB_ITEM_EDIT_${disciplineName}`;
  }

  generateDeletePermissionForDiscipline(disciplineName: string, childLevel: number): string {
    return (childLevel == 0) ? 'DISCIPLINE_DELETE' : `SUB_ITEM_DELETE_${disciplineName}`;
  }
}
