import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../domain/User';
import { UserControllerService } from '../../api/rest/service/user-controller.service';
import { Subject } from 'rxjs';
import { DisciplineDTO } from '../../api/models';
import { UserFormMangerService } from '../../shared/select-role/service/user-form-manger.service';
import 'rxjs/add/operator/takeUntil';
import { FormValidatorService } from '../../shared/validator/validator-form/form-validator.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {
  private readonly destroy: Subject<void> = new Subject();
  isEdit = false;
  isInfo = true;
  role: Array<string>;
  assignDiscipline: Array<string>;
  private originalUser: User;
  userForm: FormGroup;
  user: User = {
    id: null,
    login: '',
    name: '',
    surname: '',
    phoneNumber: '',
    roleDisciplines: null
  };

  constructor(
    private userController: UserControllerService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private formManager: UserFormMangerService,
    private router: Router,
    private formValidator: FormValidatorService,
  ) { }

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    console.log(this.user.roleDisciplines);
    this.createFormGroup();
    this.formManager.showButton(true);
    if (this.router.url.includes('info')) {
      this.isInfo = false;
      this.userForm.disable();
      this.formManager.showButton(false);
    }
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private createFormGroup(): void {
    this.userForm = this.fb.group({
      name: [this.user.name, [Validators.required, this.formValidator.userNameValidator()]],
      login: [this.user.login, [Validators.required, this.formValidator.userNameValidator()]],
      surname: [this.user.surname, [Validators.required, this.formValidator.userNameValidator()]],
      email: [this.user.login, [Validators.required, Validators.email]],
      phoneNumber: [this.user.phoneNumber, [Validators.required, this.formValidator.phoneValidator()]]
    });
  }
  public editFrom() {
    this.isEdit = true;
    this.userForm.enable();
  }
  public saveForm(): void {
    if (this.userForm.valid) {
      this.formManager.showButton(false);
      this.userForm.disable();
      this.userController.saveUser(this.user)
        .takeUntil(this.destroy)
        .subscribe(() => {
          alert('User was successfully save');
          this.router.navigate(['users']);
        },
          () => {
            alert('User was not successfully save');
            this.router.navigate(['users']);
          });
    }
  }
  getAssignRoles(roles : { [key: string]: DisciplineDTO[] }): void {
    this.user.roleDisciplines = roles;
  }
  getAssignDiscipline(assignDiscipline) {
    let role: string;
    Object.keys(assignDiscipline).map(typeRole => {
      role = typeRole;
    });
    this.user.roleDisciplines[role] = assignDiscipline[role];
    console.log(this.user);
  }
  close() {
    this.router.navigate(['users']);
  }
  findAssignDiscipline(role: string) {
    const disciplineForRole = {};
    disciplineForRole[role] = this.user.roleDisciplines[role];
    return disciplineForRole;
  }
  isExistRole(role: string) {
    const disciplineForRole = {};
    disciplineForRole[role] = this.user.roleDisciplines[role];
    return this.user.roleDisciplines[role];
  }
}
