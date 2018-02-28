import { UserInfo } from "../../domain/UserInfo";

/* tslint:disable */

export class DisciplineDTO {

  id?: number;

  name?: string;

  parentId?: number;

  subscription?: string;

  disciplineHeadsList?: UserInfo[];
}
