import { UserInfo } from '../../domain/UserInfo';

/* tslint:disable */

export class DisciplineWithDisciplineHeadsDTO {

  id?: number;

  name?: string;

  parentId?: number;

  parentName?: string;

  subscription?: string;

  disciplineHeadsList?: UserInfo[];
}
