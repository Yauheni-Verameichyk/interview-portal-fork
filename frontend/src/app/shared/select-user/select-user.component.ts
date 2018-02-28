import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../domain/UserInfo';
import { UserControllerService } from '../../api/services';
import { userInfo } from 'os';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.css']
})
export class SelectUserComponent implements OnInit {

  usersList: Array<UserInfo> = [];
  constructor(private userControllerService: UserControllerService) { }

  ngOnInit() {
    this.userControllerService.getUsersByRole('DISCIPLINE_HEAD').subscribe(
      (usersList) => {
        console.log(usersList);
        this.usersList = usersList;
      }
    );
  }

}
