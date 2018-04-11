import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { serializePath } from '@angular/router/src/url_tree';
import { SrvRecord } from 'dns';
import { DisciplineDTO } from '../../../api/models';
import 'rxjs/add/operator/takeUntil';

@Injectable()
export class UserFormMangerService {
  private isShowButton: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isShowNewRoles = false;
  public showButtonEmitter: Observable<boolean> = this.isShowButton.asObservable();

  private readonly listRoles = ['COORDINATOR', 'DISCIPLINE_HEAD', 'INTERVIEWER', 'HUMAN_RESOURCE'];

  constructor() { }

  showButton(isShow: boolean) {
    this.isShowButton.next(isShow);
  }

  getNotExistRoles(listExistRoles: string[]): string[] {
    const setNotExistRoles: Set<string> = new Set(this.listRoles);
    listExistRoles.map(existRole => {
      setNotExistRoles.delete(existRole);
    });
    return Array.from(setNotExistRoles);
  }
  getNotExistDiscipline(assignDiscipline: DisciplineDTO[], allDisciplines: DisciplineDTO[]): DisciplineDTO[] {
    const setAllAssignDiscipline: Set<DisciplineDTO> = new Set(allDisciplines);
    assignDiscipline.map(existsDiscipline => {
      setAllAssignDiscipline.forEach(newRole => {
        if(existsDiscipline.id === newRole.id){
          setAllAssignDiscipline.delete(newRole);
        }
      });
    });
    return Array.from(setAllAssignDiscipline);
  }
  formatString(role: string): string {
    role = role.replace(/_/g, ' ').toLowerCase();
    return role.charAt(0).toUpperCase() + role.slice(1);
  }
}
