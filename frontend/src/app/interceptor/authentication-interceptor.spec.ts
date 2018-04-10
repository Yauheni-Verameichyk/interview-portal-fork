import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationInterceptor} from './authentication-interceptor';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { AuthenticationControllerService } from '../api/rest/service/authentication-controller.service';
import { NavigationExtras, Router } from '@angular/router';
const authenticationServiceStub = {

};
const authenticationControllerServiceStub = {

};
const routerStub = {
  navigate(commands: any[], extras?: NavigationExtras) { },
  navigateByUrl(url: string) { return url; }
};
describe('AuthenticationInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationInterceptor,
        {provide: AuthenticationService, useValue: authenticationServiceStub},
        {provide: AuthenticationControllerService, useValue: authenticationControllerServiceStub},
        {provide: Router, useValue: routerStub}
      ]
    });
  });

  it('should be created', inject([AuthenticationInterceptor], (service: AuthenticationInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
