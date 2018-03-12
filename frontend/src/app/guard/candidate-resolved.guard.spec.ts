import { TestBed, async, inject } from '@angular/core/testing';

import { CandidateResolvedGuard } from './candidate-resolved.guard';

describe('CandidateResolvedGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandidateResolvedGuard]
    });
  });

  it('should ...', inject([CandidateResolvedGuard], (guard: CandidateResolvedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
