import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../service/authentication/authentication.service';
import 'rxjs/add/operator/catch';
import { error } from 'protractor';
import { Router } from '@angular/router';
import { AuthenticationControllerService } from '../api/rest/service/authentication-controller.service';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService, private authController: AuthenticationControllerService, private router: Router) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    console.log("interceptor works");
    const accessToken = this.auth.getTokenFromLocalStorage();
    if (accessToken) {
      console.log("1");
      if (!this.auth.isExpiredToken(accessToken)) {
        console.log("2");
        const authReq = this.auth.addToken(req, accessToken);
        return next.handle(authReq).catch(error => this.redirectToSignIn(error));
      } else {
        console.log("3");
        const refreshToken = this.auth.getRefreshTokenFromLocalStorage();
        if (refreshToken && !this.auth.isExpiredToken(refreshToken)) {
          console.log("4");
          this.auth.removeCredentialsUser();
          console.log("9");
          this.authController.getNewAccessAndRefrehToken(refreshToken).subscribe(credentials=>{
            console.log("5");
            this.auth.setCredentialsUser(credentials);
            return next.handle(this.auth.addToken(req, credentials.accessToken)).catch(error => this.redirectToSignIn(error));
          });
        }else{
          console.log("6");
          this.auth.removeCredentialsUser();
          this.redirectToSignIn("don't have refreshToken");
        }
      }
    }else{
      console.log("8");
      if(req.url === 'http://localhost:8080/interview-portal/auth'){
        return next.handle(req);
      }else if(req.url === 'http://localhost:8080/interview-portal/auth/refresh'){
        return next.handle(req);
      }
      else{
        this.redirectToSignIn("don't have Token");
      }
     
    }
  };

  private redirectToSignIn(error) {
    console.log(error);
    this.router.navigate(['/login']);
    return Observable.throw(error); //** Нужно пофиксить обработку */
  };
  
}