import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../domain/User';
import { UserControllerService } from '../../api/rest/service/user-controller.service';
import { Subject } from 'rxjs';
import { Discipline } from '../../api/models';
import { UserFormMangerService } from '../../shared/select-role/service/user-form-manger.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  private readonly destroy: Subject<void> = new Subject();
  isEdit: boolean = false;
  user: User = {
    id: null,
    login: '',
    name: '',
    surname: '',
    phoneNumber: '',
    roleDisciplines: null,
    roles: new Array<string>()
  }
  role: Array<string>;
  private  originalUser: User;
  userForm: FormGroup;

  constructor(
    private userController: UserControllerService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private formManager: UserFormMangerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    this.createFormGroup();
    this.userForm.disable();
  };

  private createFormGroup(): void {
    this.userForm = this.fb.group({
      name: [this.user.name, [Validators.required, this.userNameValidator()]],
      login: [this.user.login, [Validators.required, this.userNameValidator()]],
      surname: [this.user.surname, [Validators.required, this.userNameValidator()]],
      email: [this.user.login, [Validators.required, Validators.email]],
      phoneNumber: [this.user.phoneNumber, [Validators.required, this.phoneValidator()]],
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
    if(!this.userForm.valid){
      alert("Use");
      this.userController.saveUser(this.user).subscribe(()=>{
        alert("User was successfully save");
      },
    () =>{
      alert("User was not successfully save");
    });
    }
  }
  private userNameValidator(): ValidatorFn {
    const pattern: RegExp = /^[\w\.\$@\*\!]{5,30}$/;
    return (control: AbstractControl): { [key: string]: any } => {
      if (!(control.dirty || control.touched)) {
        return null;
      } else {
        return pattern.test(control.value) ? null : { custom: `Min length:5, can't contain whitespaces & special symbols.` };
      }
    };
  }
  private langthValidator(): ValidatorFn[] {
    return [Validators.required, Validators.minLength(6), Validators.maxLength(20)]
  }

  private phoneValidator(): ValidatorFn {
    const pattern: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return (control: AbstractControl): { [key: string]: any } => {
      if (!(control.dirty || control.touched)) {
        return null;
      } else {
        return pattern.test(control.value) ? null : { custom: `Invalid phone number` };
      }
    };
  }
  getRoles(roles: Array<string>):void{
    this.user.roles = roles;
  }
  close(){
    this.router.navigate(['users']);
  }
}
