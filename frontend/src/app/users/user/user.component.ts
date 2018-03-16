import { Component, OnInit, Input } from '@angular/core';
import { UserCredentials } from '../../domain/UserCredentials';
import { UserInfo } from '../../domain/UserInfo';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: '[app-user]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() userObj: UserInfo;
  user: UserInfo;
 

  constructor(private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.user = new UserInfo(this.userObj.id, this.userObj.name, this.userObj.surname, this.userObj.roles);
  }
  showUserInfo() {
    const link = ['/users/' + this.user.id + '/info'];
    this.router.navigate(link, { relativeTo: this.route });
  }

}
