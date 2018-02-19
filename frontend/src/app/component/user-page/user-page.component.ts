import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserDTO } from '../../api/models';
import { AuthenticationControllerService, UserControllerService } from '../../api/services';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import "rxjs/add/operator/takeUntil";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit, OnDestroy {

  userList: UserDTO[];
  private readonly unsubscribe: Subject<void> = new Subject();

  constructor(private userService: UserControllerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService
      .findAllUsingGET_1()
      .takeUntil(this.unsubscribe)
      .subscribe((userList: UserDTO[]) => {
        this.userList = userList;
      },
        (error: any) => {
          this.router.navigate(['/']);
        });
  }

  getRoles(user: UserDTO): Array<string> {
    let roles = Object.keys(user.roleDisciplines);
    for (let i in roles) {
      let role = roles[i].toLowerCase();
      role = role.charAt(0).toUpperCase() + role.slice(1);
      role = " " + role.replace(/_/g, " ");
      roles[i] = role;
    }
    return roles;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
