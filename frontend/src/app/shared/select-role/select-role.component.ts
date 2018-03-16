import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserFormMangerService } from './service/user-form-manger.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'appSelectRole',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.css']
})
export class SelectRoleComponent implements OnInit, OnDestroy {
  private readonly destroy: Subject<void> = new Subject();
  @Output() editRoles = new EventEmitter<Array<string>>();
  @Input() roles: Array<string>;

  isShowButton: boolean = false;

  constructor(private buttonManager: UserFormMangerService) {
    buttonManager.showButtonEmitter
      .takeUntil(this.destroy)
      .subscribe(isShow => {
        this.isShowButton = isShow;
      });
  }


  ngOnInit() {

  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
  rolesChanges(): void {
    this.editRoles.emit(this.roles);
  }
  deleteRole(index: number): void {
    this.roles.splice(index, 1);
    this.rolesChanges();
  }

  transformStyle(role: string): string {
    role = role.replace(/_/g, " ").toLowerCase();
    return role.charAt(0).toUpperCase() + role.slice(1);

  }
}
