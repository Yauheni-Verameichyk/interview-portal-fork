import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router, ActivatedRoute } from '@angular/router';
import { Candidate } from '../api/models/candidate';
import { CandidateControllerService } from '../api/services/candidate-controller.service';

@Injectable()
export class CandidateResolvedGuard implements Resolve<Candidate> {

  constructor(private candidateController: CandidateControllerService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Candidate | Observable<Candidate> | Promise<Candidate> {
    const id: number = +route.paramMap.get('id');
    return this.candidateController.findByIdUsingGET(id);
  }
}
