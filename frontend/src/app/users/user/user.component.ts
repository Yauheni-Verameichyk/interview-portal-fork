import { Component, OnInit, Input } from '@angular/core';
import { UserCredentials } from '../../domain/UserCredentials';
import { UserInfo } from '../../domain/UserInfo';

@Component({
  selector: '[app-user]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user: UserInfo;

  constructor() { }

  ngOnInit() {
    
  }

  transformStyle(role: string): string{
    role = role.replace(/_/g, " ").toLowerCase();
    return role.charAt(0).toUpperCase() + role.slice(1) ;
    
  }
}
