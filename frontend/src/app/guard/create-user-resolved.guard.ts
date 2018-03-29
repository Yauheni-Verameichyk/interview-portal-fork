import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../domain/User';

@Injectable()
export class CreateUserResolvedGuard implements Resolve<User> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
    const user = new User();
    user.login = '';
    user.name = '';
    user.phoneNumber = '';
    user.roleDisciplines = {};
    user.surname = '';
    return user;
  }
}
