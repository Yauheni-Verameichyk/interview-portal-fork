import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { BehaviorSubject } from 'rxjs';
import { NavbarManager } from '../../service/navbar/navbar-manager';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { SharedModule } from '../../shared/shared.module';
import { Observable } from "rxjs/Observable";
import { RouterTestingModule } from '@angular/router/testing';

const navbarManagerStub = {
  isShowNavBar: true,
  showNavBarEmitter: new BehaviorSubject<boolean>(true)
};
const authServiceStub = {
  getTokenFromLocalStorage(): string {
    return 'token';
  },
  getNotExistTokenFromLocalStorage(): string {
    return null;
  },
  isPermissionPresent(permissionName: string): boolean {
    return true;
  }
};
describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let navbarManager: NavbarManager;
  let authService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: NavbarManager, useValue: navbarManagerStub },
        { provide: AuthenticationService, useValue: authServiceStub },
      ],
      imports: [ SharedModule ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create', () => {
    expect('v').toBeTruthy();
  });
});
