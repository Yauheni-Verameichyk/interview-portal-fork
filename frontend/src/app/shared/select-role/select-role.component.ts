import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserFormMangerService } from './service/user-form-manger.service';
import { Subject } from 'rxjs';
import { DisciplineDTO } from '../../api/models';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'appSelectRole',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.css']
})
export class SelectRoleComponent implements OnInit, OnDestroy {
  private readonly destroy: Subject<void> = new Subject();
  @Output() editRoles = new EventEmitter<{ [key: string]: DisciplineDTO[] }>();
  @Input() roles: { [key: string]: DisciplineDTO[] };
  assignRolesForUser: string[] = [];
  newRoles: Array<string>;
  public isNewRolesShown = false;
  isShowButton;

  constructor(private userFormManager: UserFormMangerService) {
  }

  ngOnInit() {
    this.userFormManager.showButtonEmitter
      .takeUntil(this.destroy)
      .subscribe(isShow => {
        this.isShowButton = isShow;
      });
    Object.keys(this.roles).map(role => {
      this.assignRolesForUser.push(role);
    });
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
  rolesChanges(): void {
    this.editRoles.emit(this.roles);
  }
  deleteRole(index: number): void {
    const role = this.assignRolesForUser[index];
    this.assignRolesForUser.splice(index, 1);
    delete this.roles[role];
    this.rolesChanges();
  }
  addRoles() {
    this.newRoles = this.userFormManager.getNotExistRoles(this.assignRolesForUser);
    this.newRoles.length > 0 ? this.isNewRolesShown = true : this.isNewRolesShown = false;
  }
  addNewRole(index: number) {
    const role = this.newRoles[index];
    if (role === 'DISCIPLINE_HEAD' || role === 'INTERVIEWER') {
      this.roles[role] = [];
    } else {
      this.roles[role] = null;
    }

    this.assignRolesForUser.push(this.newRoles[index]);
    this.newRoles.splice(index, 1);
    this.rolesChanges();
    this.newRoles.length <= 0 ? this.isNewRolesShown = false : this.isNewRolesShown = true;
  }
  renderRoles(role: string): string {
    return this.userFormManager.formatString(role);
  }
}
