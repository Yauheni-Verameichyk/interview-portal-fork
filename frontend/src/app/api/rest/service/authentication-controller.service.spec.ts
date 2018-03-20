import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationControllerService } from './authentication-controller.service';
import { HttpClientModule } from '@angular/common/http';

describe('AuthenticationControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AuthenticationControllerService]
    });
  });

  it('should be created', inject([AuthenticationControllerService], (service: AuthenticationControllerService) => {
    expect(service).toBeTruthy();
  }));
});
