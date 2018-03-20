import { TestBed, inject } from '@angular/core/testing';

import { UserControllerService } from './user-controller.service';
import { HttpClientModule } from '@angular/common/http';

describe('UserControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UserControllerService]
    });
  });

  it('should be created', inject([UserControllerService], (service: UserControllerService) => {
    expect(service).toBeTruthy();
  }));
});
