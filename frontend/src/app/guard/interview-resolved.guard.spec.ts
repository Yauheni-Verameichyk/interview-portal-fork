import { TestBed, async, inject } from '@angular/core/testing';

import { InterviewResolvedGuard } from './interview-resolved.guard';

xdescribe('InterviewResolvedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterviewResolvedGuard]
    });
  });

  it('should ...', inject([InterviewResolvedGuard], (guard: InterviewResolvedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
