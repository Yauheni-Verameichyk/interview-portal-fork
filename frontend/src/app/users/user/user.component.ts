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

}
