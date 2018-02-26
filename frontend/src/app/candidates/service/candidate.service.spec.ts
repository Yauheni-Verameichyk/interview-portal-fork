import { TestBed, inject } from '@angular/core/testing';

import { CandidateService } from './candidate.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandidateService]
    });
  });

  it('should be created', inject([CandidateService], (service: CandidateService) => {
    expect(service).toBeTruthy();
  }));
});
