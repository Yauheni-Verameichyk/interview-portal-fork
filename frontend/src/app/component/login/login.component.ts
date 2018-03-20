import { Component, OnInit, OnDestroy } from '@angular/core';
import {  Authentication } from '../../domain/Authentication';
import { AuthenticationControllerService } from '../../api/rest/service/authentication-controller.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { Subscription } from 'rxjs/Subscription';
import { error } from 'util';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { NavbarManager } from '../../service/navbar/navbar-manager';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {


  public user: Authentication = {
    login: '',
    password: ''
  };
  errorMessage: string;
  private readonly destroy: Subject<void> = new Subject();
  userForm: FormGroup;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private authController: AuthenticationControllerService,
    private navbarManager: NavbarManager) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      'login': new FormControl(this.user.login, [
        Validators.required,
        Validators.minLength(4),
      ]),
      'password': new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(2),
      ])
    });
    this.authenticationService.removeCredentialsUser();
    this.navbarManager.showNavbar(false);
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  authorize(): void {
    if (this.userForm.valid) {
      this.initializeUser(this.userForm.get('login').value, this.userForm.get('password').value);
        this.authController
        .authorizationUserPOST(this.user)
        .takeUntil(this.destroy)
        .subscribe(data =>{
          this.authenticationService.setCredentialsUser(data);
          this.navbarManager.showNavbar(true);
          this.router.navigate(['welcome-page']);
        }, error=>{
          this.errorMessage = 'wrong login or password';
        });
    }
  }

  initializeUser(login: string, password: string): void {
    this.user.login = login;
    this.user.password = password;
  }

  get login() { return this.userForm.get('login'); }

  get password() { return this.userForm.get('password'); }

}
