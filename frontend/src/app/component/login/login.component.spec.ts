import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationControllerService } from '../../api/services';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthenticationControllerService, useClass: AuthenticationControllerServiceStub }
      ]
    })
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
    const login = component.userForm.controls['login'];
    login.setValue('q');
    expect(login.valid).toBeFalsy();
  });
  it('password field validity when field is empty', () => {
    const login = component.userForm.controls['login'];
    expect(login.valid).toBeFalsy();
  });
  it('password field validity when field is valid', () => {
    const login = component.userForm.controls['login'];
    login.setValue('qsasasw');
    expect(login.valid).toBeTruthy();
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
    component.authorize();
    expect(localStorage.getItem('token')).toBe('token');
  });
});


class AuthenticationControllerServiceStub {
  authorizationUsingPOST({login, password}) {
    return Observable.of('token');
  }
}
