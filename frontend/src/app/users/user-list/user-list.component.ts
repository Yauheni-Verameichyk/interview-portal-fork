import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../domain/UserInfo';
import { UserControllerService } from '../../api/rest/service/user-controller.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: Array<UserInfo>;

  constructor(private userController: UserControllerService) { }

  ngOnInit() {
    this.userController
      .getUsers().subscribe(userList => {
        this.users = userList;
      },
      error =>{
        console.log(`Error in user list component typy error: ${error}`)
      });
  }

}
