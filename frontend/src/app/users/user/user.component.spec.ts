import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { SharedModule } from '../../shared/shared.module';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteStub } from '../../disciplines/discipline/discipline.component.spec';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { UserControllerService } from '../../api/rest/service/user-controller.service';
import { HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { UserInfo } from '../../domain/UserInfo';

const routerStub = {
  navigate(commands: any[], extras?: NavigationExtras) { },
  navigateByUrl(url: string) { return url; }
};
const activatedRouterStub = {
  params: Observable.of(),
  snapshot() {
    return { params: {} };
  }
};
const userControllerServiceStub = {
  deleteUser(userId: number): Observable<HttpResponse<void>> {
    return Observable.of(null);
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
const user = {
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
};

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: activatedRouterStub },
        { provide: UserControllerService, useValue: userControllerServiceStub },
        { provide: AuthenticationService, useValue: authServiceStub },
      ],
      imports: [
        SharedModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component.userObj = <UserInfo> user;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
