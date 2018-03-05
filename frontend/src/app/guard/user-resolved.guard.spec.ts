import { TestBed, async, inject } from '@angular/core/testing';

import { UserResolvedGuard } from './user-resolved.guard';

describe('UserResolvedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserResolvedGuard]
    });
  });

  it('should ...', inject([UserResolvedGuard], (guard: UserResolvedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
