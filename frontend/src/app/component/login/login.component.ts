import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationControllerService } from '../../api/services';
import { AuthenticationDTO } from '../../api/models';
import { HttpResponse } from 'selenium-webdriver/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output() onChanged = new EventEmitter();
  login: string = "";
  password: string = "";
  errorMessage: string = "";
  
  constructor(private router: Router,
              private authenticationService: AuthenticationControllerService) {}

  change(){
    
    let user: AuthenticationDTO = {
      login: this.login,
      password: this.password
    }
    console.log(user);
    this.authenticationService
      .authorizationUsingPOST(user)
      .subscribe((body: string) => {
        console.log(body);
        localStorage.setItem("token", body);
        this.onChanged.emit();
        this.router.navigate(['user']);
        }, (error: any) => {
          localStorage.removeItem("token");
          this.errorMessage = "login or password wrong"
          console.log("error");
        } );
  }

}
