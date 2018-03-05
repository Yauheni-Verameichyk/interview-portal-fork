import { TestBed, inject } from '@angular/core/testing';

import { UserFormMangerService } from './user-form-manger.service';

describe('UserFormMangerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserFormMangerService]
    });
  });

  it('should be created', inject([UserFormMangerService], (service: UserFormMangerService) => {
    expect(service).toBeTruthy();
  }));
});
