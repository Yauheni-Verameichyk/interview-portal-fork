import { TestBed, inject } from '@angular/core/testing';

import { CandidateFormService } from './candidate-form.service';

describe('CandidateFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandidateFormService]
    });
  });

  it('should be created', inject([CandidateFormService], (service: CandidateFormService) => {
    expect(service).toBeTruthy();
  }));
});
