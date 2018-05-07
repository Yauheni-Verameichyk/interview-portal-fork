import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Interview } from '../api/models/interview';
import { InterviewControllerService } from '../api/services/interview-controller.service';

@Injectable()
export class InterviewResolvedGuard implements Resolve<Interview> {

  constructor(private interviewController: InterviewControllerService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Interview | Observable<Interview> | Promise<Interview> {
    const id:number = +route.paramMap.get('id');
    return this.interviewController.findByIdUsingGET_2(id);
  }

}
