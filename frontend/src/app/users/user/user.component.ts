import { Component, OnInit, Input } from '@angular/core';
import { UserCredentials } from '../../domain/UserCredentials';
import { UserInfo } from '../../domain/UserInfo';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: '[app-user]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user: UserInfo;
  
  constructor( private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {
    
  }
  transformStyle(role: string): string{
    role = role.replace(/_/g, " ").toLowerCase();
    return role.charAt(0).toUpperCase() + role.slice(1) ;
    
  }
  showUserInfo(){
    const link = ['/users/'+this.user.id +'/info'];
    //this.router.navigate(link);
    this.router.navigate(link, {relativeTo: this.route});
  }
}
