import { TestBed, async, inject } from '@angular/core/testing';

import { CandidateResolvedGuard } from './candidate-resolved.guard';
import { Router, NavigationExtras } from '@angular/router';
import { CandidateControllerService } from '../api/services/candidate-controller.service';
import { DisciplineDTO } from '../api/models';
const routerStub = {
  navigate(commands: any[], extras?: NavigationExtras) { },
  navigateByUrl(url: string) { return url; }
};
const candidateControllerServiceStub = {
  findByIdUsingGET(id: number) {
    return {
      disciplineList: [new DisciplineDTO],
      candidateEducationList: [{}],
      id: 1,
      name: 'Petrovich',
      phone: 123456,
      surname: 'petrovich',
      candidateWorkList: [{}]
    };
  }
};
describe('CandidateResolvedGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CandidateResolvedGuard,
        { provide: Router, useValue: routerStub },
        { provide: CandidateControllerService, useValue: candidateControllerServiceStub },
      ]
    });
  });

  it('should ...', inject([CandidateResolvedGuard], (guard: CandidateResolvedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
