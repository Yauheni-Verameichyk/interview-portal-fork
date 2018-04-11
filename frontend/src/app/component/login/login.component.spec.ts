import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { AuthenticationControllerService } from '../../api/rest/service/authentication-controller.service';
import { NavbarManager } from '../../service/navbar/navbar-manager';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      declarations: [LoginComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        NavbarManager,
        { provide: NavbarManager, useClass: NavbarManagerStub },
        { provide: AuthenticationControllerService, useClass: AuthenticationControllerServiceStub },
        { provide: Router, useClass: RouterStub },
        {provide: AuthenticationService, useClass: AuthenticationServiceStub}
      ]})
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
    expect(component.userForm.valid).toBeFalsy();
  });
  it('login field validity if field is too short', () => {
    const login = component.userForm.controls['login'];
    login.setValue('qw');
    expect(login.valid).toBeFalsy();
  });
  it('login field validity when field is empty', () => {
    const login = component.userForm.controls['login'];
    expect(login.valid).toBeFalsy();
  });
  it('login field validity when field is valid', () => {
    const login = component.userForm.controls['login'];
    login.setValue('qsasasw');
    expect(login.valid).toBeTruthy();
  });
  it('password field validity if field is too short', () => {
    const password = component.userForm.controls['password'];
    password.setValue('q');
    expect(password.valid).toBeFalsy();
  });
  it('password field validity when field is empty', () => {
    const password = component.userForm.controls['password'];
    expect(password.valid).toBeFalsy();
  });
  it('password field validity when field is valid', () => {
    const password = component.userForm.controls['password'];
    password.setValue('qsasasw');
    expect(password.valid).toBeTruthy();
  });
  it('should change user if form is valid', () => {
    expect(component.userForm.valid).toBeFalsy();
    component.userForm.controls['login'].setValue('ananas');
    component.userForm.controls['password'].setValue('pass');
    expect(component.userForm.valid).toBeTruthy();
    component.authorize();
    expect(component.user.login).toBe('ananas');
    expect(component.user.password).toBe('pass');
  });
  it('should save token if form is valid', () => {
    expect(component.userForm.valid).toBeFalsy();
    component.userForm.controls['login'].setValue('ananas');
    component.userForm.controls['password'].setValue('pass');
    expect(component.userForm.valid).toBeTruthy();
    localStorage.setItem('token', 'token');
    component.authorize();
    expect(localStorage.getItem('token')).toBe('token');
  });
});

class AuthenticationControllerServiceStub {
  authorizationUserPOST({ login, password }) {
    return Observable.of('token');
  }
}
class AuthenticationServiceStub {
  removeCredentialsUser() { }
  setCredentialsUser() {}
}
class NavbarManagerStub {
  showNavbar() { }
}

class RouterStub {
  navigate(any): void {
  }
}
