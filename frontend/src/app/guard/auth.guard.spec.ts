import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { NavigationExtras, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication/authentication.service';
const routerStub = {
  navigate(commands: any[], extras?: NavigationExtras) { },
  navigateByUrl(url: string) { return url; }
};
const authenticationServiceStub = {
  getTokenFromLocalStorage(): string {
    return 'wqasdaxfvxcdv';
  }
};
describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub }
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
