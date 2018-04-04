import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from 'selenium-webdriver/http';
import { NavigationExtras, Router } from '@angular/router';
import { UserControllerService } from '../../api/services/user-controller.service';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { SharedModule } from '../../shared/shared.module';

const routerStub = {
  navigate(commands: any[], extras?: NavigationExtras) { },
  navigateByUrl(url: string) { return url; }
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
const users = [{
  id: 1,
  name: 'Petrovich',
  surname: 'Petrovich',
  roles: ['HUMAN_RESOURCE', 'DISCIPLINE_HEAD', 'COORDINATOR']
  },
  {id: 1,
  name: 'Petrovich',
  surname: 'Petrovich',
  roles: ['HUMAN_RESOURCE', 'DISCIPLINE_HEAD', 'COORDINATOR']
  }];

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
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
