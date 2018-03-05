import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../domain/User';
import { UserControllerService } from '../../api/rest/service/user-controller.service';
import { Subject } from 'rxjs';
import { Discipline } from '../../api/models';
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
  isEdit: boolean = false;
  role: Array<string>;
  private originalUser: User;
  userForm: FormGroup;
  user: User = {
    id: null,
    login: '',
    name: '',
    surname: '',
    phoneNumber: '',
    roleDisciplines: null,
    roles: new Array<string>()
  }

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
    this.createFormGroup();
    this.userForm.disable();
  };
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
      phoneNumber: [this.user.phoneNumber, [Validators.required, this.formValidator.phoneValidator()]],
      roles: this.fb.array(this.user.roles)
    });
  }
  public editFrom() {
    this.isEdit = true;
    this.userForm.enable();
    this.formManager.showButton(true);
  }
  public saveForm(): void {
    this.isEdit = false;
    this.formManager.showButton(false);
    this.userForm.disable();
    if (!this.userForm.valid) {
      this.userController.saveUser(this.user)
        .takeUntil(this.destroy)
        .subscribe(() => {
          alert("User was successfully save");
          this.router.navigate(['users']);
        },
          () => {
            alert("User was not successfully save");
            this.router.navigate(['users']);
          });
    }
  }
  getRoles(roles: Array<string>): void {
    this.user.roles = roles;
  }
  close() {
    this.router.navigate(['users']);
  }
}
