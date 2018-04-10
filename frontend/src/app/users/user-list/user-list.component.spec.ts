import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from 'selenium-webdriver/http';
import { NavigationExtras, Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { SharedModule } from '../../shared/shared.module';
import { User } from '../../domain/User';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserInfo } from '../../domain/UserInfo';
import { UserControllerService } from '../../api/rest/service/user-controller.service';

const routerStub = {
  navigate(commands: any[], extras?: NavigationExtras) { },
  navigateByUrl(url: string) { return url; }
};
const userControllerServiceStub = {
  deleteUser(userId: number): Observable<HttpResponse> {
    return Observable.of(null);
  },
  getUsers(page: number): Observable<UserInfo[]> {
    return Observable.of(users);
  }
};
const authServiceStub = {
  getTokenFromLocalStorage(): string {
    return 'token';
  },
  isPermissionPresent(permissionName: string): boolean {
    return true;
  }
};
const users = [{
  id: 1,
  name: 'Petrovich',
  surname: 'Petrovich',
  roles: ['HUMAN_RESOURCE', 'DISCIPLINE_HEAD', 'COORDINATOR'],
  get getRoles(): Array<string> | string[] {
    return this.roles.map(role => {
      role =  role.replace(/_/g, ' ').toLowerCase();
      return role.charAt(0).toUpperCase() + role.slice(1);
    });
  }
},
{
  id: 1,
  name: 'Petrovich',
  surname: 'Petrovich',
  roles: ['HUMAN_RESOURCE', 'DISCIPLINE_HEAD', 'COORDINATOR'],
  get getRoles(): Array<string> | string[] {
    return this.roles.map(role => {
      role =  role.replace(/_/g, ' ').toLowerCase();
      return role.charAt(0).toUpperCase() + role.slice(1);
    });
  }
}];

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: UserControllerService, useValue: userControllerServiceStub },
        { provide: AuthenticationService, useValue: authServiceStub },
      ],
      imports: [
        SharedModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
