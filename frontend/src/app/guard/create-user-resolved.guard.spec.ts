import { TestBed, async, inject } from '@angular/core/testing';

import { CreateUserResolvedGuard } from './create-user-resolved.guard';

describe('CreateUserResolvedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateUserResolvedGuard]
    });
  });

  it('should ...', inject([CreateUserResolvedGuard], (guard: CreateUserResolvedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
