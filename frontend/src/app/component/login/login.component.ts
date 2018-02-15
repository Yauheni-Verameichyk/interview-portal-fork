import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationControllerService } from '../../api/services';
import { AuthenticationDTO } from '../../api/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output() onChanged = new EventEmitter();
  
  constructor(private router: Router) {}
              private authenticationService: AuthenticationControllerService

  change(){
    this.onChanged.emit();
    const user : AuthenticationDTO = {
      login: "www",
      password: "www"
    }
    this.authenticationService
      .authorizationUsingPOST(user)
      .subscribe((body: any) => console.log(body) );
    this.router.navigate(['user']);
  }

}
