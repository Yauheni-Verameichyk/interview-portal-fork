import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserFormComponent } from './user-form.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../domain/User';
import { HttpResponse } from '@angular/common/http';
import { UserControllerService } from '../../api/rest/service/user-controller.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const userControllerServiceStub = {
  saveUser(user: User): Observable<HttpResponse<void>> {
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
const userStub: User = {
  id: 1,
  login: 'IlyaNikolaev',
  password: '2222',
  name: 'Petrovich',
  surname: 'Petrovich',
  phoneNumber: '123456789',
  email: 'petrovich@mail.ru',
  roleDisciplines: { HUMAN_RESOURCE: null }
};
const activatedRouterStub = {
  snapshot: { data: {user: userStub}}
};
const routerStub = {
  url: { includes(str: string) {
    return true;
  }}
};
describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [ReactiveFormsModule, FormsModule, SharedModule ],
      providers: [
        FormBuilder,
        { provide: AuthenticationService, useValue: authServiceStub },
        { provide: UserControllerService, useValue: userControllerServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouterStub },
        { provide: Router, useValue: routerStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    component.user = userStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
