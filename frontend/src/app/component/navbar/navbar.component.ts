import { Component, OnInit } from '@angular/core';
import { NavbarManager } from '../../service/navbar/navbar-manager';
import { UserService } from '../../users/service/user.service';
import { AuthenticationService } from '../../service/authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  toggle=false;
  isShowNavbar = false;

  constructor(
    private navbarManager: NavbarManager,
    private authService: AuthenticationService) {
    this.navbarManager.showNavBarEmitter.subscribe(isShow => { this.isShowNavbar = isShow });
  }

  ngOnInit(): void {
    if (this.authService.getTokenFromLocalStorage()) {
      this.isShowNavbar = true;
    }
  }

}
