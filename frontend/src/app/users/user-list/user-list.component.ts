import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { UserInfo } from '../../domain/UserInfo';
import { UserControllerService } from '../../api/rest/service/user-controller.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  private readonly destroy: Subject<void> = new Subject();
  public isLoaded: boolean;
  users: Array<UserInfo> = new Array<UserInfo>();
  private searchParameters = 'userRoleDisciplines#COORDINATOR,DISCIPLINE_HEAD,INTERVIEWER,HUMAN_RESOURCE';
  constructor(private userController: UserControllerService, private router: Router) { }
  
  ngOnInit() {
    this.getUsersWithParams();
  }
  addNewUser() {
    this.router.navigate([{ outlets: { popup: ['users', 'new'] } }]);
  }
  receiveUsersFromSearch(parameters: string) {
    this.users = [];
    this.searchParameters = parameters;
    this.getUsersWithParams();
  }
  @HostListener('window:scroll', ['$event'])
  windowScrollListener() {
    const position = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if ((position === max)) {
      this.getUsersWithParams(this.users.length);
    }
  }

  private getUsersWithParams(quantity?: number) {
    this.userController.getUsers(quantity, this.searchParameters).takeUntil(this.destroy).subscribe(
      userList => {
        this.users.push(...userList);
        this.isLoaded = true;
      },
      error => {
        console.log(`Error in user list component type error: ${error}`);
      });
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    document.body.style.overflowY = 'scroll';
  }
}
