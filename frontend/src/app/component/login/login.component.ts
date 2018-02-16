import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationControllerService } from '../../api/services';
import { AuthenticationDTO } from '../../api/models';
import { HttpResponse } from 'selenium-webdriver/http';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() onChanged = new EventEmitter();
  public user: AuthenticationDTO = {
    login: '',
    password: ''
  };
  errorMessage: string;

  userForm: FormGroup;

  constructor(private router: Router,
    private authenticationService: AuthenticationControllerService) { }

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
  }

  authorize(): void {
    this.initializeUser(this.userForm.get('login').value, this.userForm.get('password').value);
    this.authenticationService
      .authorizationUsingPOST(this.user)
      .subscribe((body: string) => {
        localStorage.setItem('token', body);
        this.onChanged.emit();
        this.router.navigate(['user']);
      }, (error: any) => {
        localStorage.removeItem('token');
        this.errorMessage = 'wrong login or password';
      });
  }

  initializeUser(login: string, password: string): void {
    this.user.login = login;
    this.user.password = password;
  }

  get login() { return this.userForm.get('login'); }

  get password() { return this.userForm.get('password'); }
}
