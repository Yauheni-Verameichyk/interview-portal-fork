import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, 
  HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../service/authentication/authentication.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import { error } from 'protractor';
import { Router } from '@angular/router';
import { AuthenticationControllerService } from '../api/rest/service/authentication-controller.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService, private authController: AuthenticationControllerService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse
  | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const accessToken = this.auth.getTokenFromLocalStorage();
    if (accessToken) {
      if (!this.auth.isExpiredToken(accessToken)) {
        const authReq = this.auth.addToken(req, accessToken);
        return next.handle(authReq).catch(error => this.redirectToSignIn(error));
      } else {
        const refreshToken = this.auth.getRefreshTokenFromLocalStorage();
        if (refreshToken && !this.auth.isExpiredToken(refreshToken)) {
          this.auth.removeCredentialsUser();
          return  this.authController.getNewAccessAndRefrehToken(refreshToken).flatMap((credentials)=> {
            this.auth.setCredentialsUser(credentials);
            return next.handle(this.auth.addToken(req, credentials.accessToken)).catch(error => this.redirectToSignIn(error));
        });
        } else {
          this.auth.removeCredentialsUser();
          this.redirectToSignIn("don't have refreshToken");
        }
      }
    } else {
      if (req.url === 'http://localhost:8080/interview-portal/auth') {
        return next.handle(req);
      } else if (req.url === 'http://localhost:8080/interview-portal/auth/refresh') {
        return next.handle(req);
      }
      else {
        this.redirectToSignIn("don't have Token");
      }
    }
  };
  private redirectToSignIn(error) {
    this.router.navigate(['/login']);
    return Observable.throw(error);
  };

}

