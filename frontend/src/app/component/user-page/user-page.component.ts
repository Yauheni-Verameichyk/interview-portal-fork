import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../api/models';
import { AuthenticationControllerService, UserControllerService } from '../../api/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  userList: UserDTO[];

  constructor(private userService: UserControllerService,
              private router: Router
            ) { }

  ngOnInit() {
    this.userService
      .findAllUsingGET_1()
      .subscribe((userList: UserDTO[]) => {
        console.log(userList)
          this.userList = userList}, 
                  (error: any) =>{
                    console.log(error)
                    this.router.navigate(['/']);
                  });
  }

}
