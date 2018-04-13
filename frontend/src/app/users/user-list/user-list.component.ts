import { Component, OnInit, HostListener } from '@angular/core';
import { UserInfo } from '../../domain/UserInfo';
import { UserControllerService } from '../../api/rest/service/user-controller.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public isLoaded: boolean = false;
  users: Array<UserInfo> = new Array<UserInfo>();
  constructor(private userController: UserControllerService, private router: Router) { }

  ngOnInit() {
    this.userController
      .getUsers(0).subscribe(userList => {
        this.users = userList;
        this.isLoaded = true;
      },
        error => {
          console.log(`Error in user list component type error: ${error}`);
        });
  }
  addNewUser() {
    this.router.navigate([{ outlets: { popup: ['users', 'new'] } }]);
  }
  @HostListener('window:scroll', ['$event'])
  windowScrollListener() {
    const position = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if ((position === max)) {
      this.userController
      .getUsers(this.users.length).subscribe(userList => {
        this.users.push(...userList);
      },
        error => {
          console.log(`Error in user list component type error: ${error}`);
        });
    }
  }

}
