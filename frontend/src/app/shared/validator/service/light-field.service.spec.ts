import { TestBed, inject } from '@angular/core/testing';
import { LightFieldService } from './light-field.service';

describe('LightFieldService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LightFieldService]
    });
  });

  it('should be created', inject([LightFieldService], (service: LightFieldService) => {
    expect(service).toBeTruthy();
  }));
});
