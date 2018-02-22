import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationControllerService } from './authentication-controller.service';

describe('AuthenticationControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationControllerService]
    });
  });

  it('should be created', inject([AuthenticationControllerService], (service: AuthenticationControllerService) => {
    expect(service).toBeTruthy();
  }));
});
