import { TestBed, async, inject } from '@angular/core/testing';

import { UserResolvedGuard } from './user-resolved.guard';
import { Router, NavigationExtras } from '@angular/router';
import { UserControllerService } from '../api/rest/service/user-controller.service';
const routerStub = {
  navigate(commands: any[], extras?: NavigationExtras) { },
  navigateByUrl(url: string) { return url; }
};
const userControllerServiceStub = {
  getUserById(id: number) {
    return {
      id: 1,
      name: 'Petrovich',
      surname: 'Petrovich',
      roles: ['HUMAN_RESOURCE', 'DISCIPLINE_HEAD', 'COORDINATOR'],
      get getRoles(): Array<string> | string[] {
        return this.roles.map(role => {
          role =  role.replace(/_/g, ' ').toLowerCase();
          return role.charAt(0).toUpperCase() + role.slice(1);
        });
      }
    };
  }
};
describe('UserResolvedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserResolvedGuard,
        { provide: Router, useValue: routerStub },
        { provide: UserControllerService, useValue: userControllerServiceStub },
      ]
    });
  });

  it('should ...', inject([UserResolvedGuard], (guard: UserResolvedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
