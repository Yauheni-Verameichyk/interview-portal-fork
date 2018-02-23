import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../service/authentication/authentication.service';
import 'rxjs/add/operator/catch';
import { error } from 'protractor';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService, private router: Router) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const token = this.auth.getTokenFromLocalStorage();
    console.log('intercept works');
    console.log('Token >>>>>>>>' + token)
    if (token) {
      if (this.auth.isExpiredToken) {
        const authReq = this.auth.addToken(req, token);
        return next.handle(authReq).catch(error => this.redirectToSignIn(error));
      } else {
        const refreshToken = this.auth.getRefreshTokenFromLocalStorage();
        if (refreshToken) {
          let token = this.auth.getNewTokens(refreshToken);
          return next.handle(this.auth.addToken(req, token)).catch(error => this.redirectToSignIn(error));
        }else{
          this.redirectToSignIn("don't have refreshToken");
        }
      }
    }else{
      console.log('Token Not exists send query to ' + req.url);
      if(req.url === 'http://localhost:8080/interview-portal/auth'){
        return next.handle(req);
      }else{
        this.redirectToSignIn("don't have Token");
      }
     
    }
  }
  /**
   * @param error 
   * Логика такая если нам не удалось успешно рефрешнуть токен то преренаправляем на страницу авторизации Мужик завтра у тебя все получиться =)
   * 
   */
  private redirectToSignIn(error) {
    console.log(error);
    this.router.navigate(['/login']);
    return Observable.throw(error); //** Нужно пофиксить обработку */
  }
}
