import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../domain/User';
import { UserControllerService } from '../api/rest/service/user-controller.service';

@Injectable()
export class UserResolvedGuard implements Resolve<User> {

  constructor(private userController: UserControllerService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
    const id: number = +route.paramMap.get('id');
    return this.userController.getUserById(id);
  }

}
