import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { AuthenticationControllerService } from '../../api/rest/service/authentication-controller.service';
import { error } from 'protractor';
import { Observable } from 'rxjs/observable';
import { UserCredentials } from '../../domain/UserCredentials';
@Injectable()
export class AuthenticationService {

  
  constructor(private authController: AuthenticationControllerService) { }

  public setCredentialsUser(credentialsUser: UserCredentials){
      this.setTokenInLocalStorage(credentialsUser.accessToken);
      this.setRefreshTokenInLocalStorage(credentialsUser.refreshToken);
      this.setCredentialsInLocalStorage(credentialsUser.credentials) ;
  }
  public getTokenFromLocalStorage(): string {
    return localStorage.getItem('token');
  }
  public getRefreshTokenFromLocalStorage(): string {
    return localStorage.getItem('refreshToken');
  }
  private setCredentialsInLocalStorage(credentials){
    localStorage.setItem('credentials', credentials);
  }
  private setTokenInLocalStorage(token:string): void {
    localStorage.setItem('token', token);
  }
  private setRefreshTokenInLocalStorage(refreshToken:string): void {
    localStorage.setItem('refreshToken', refreshToken );
  }
  public isExpiredToken(token: string): boolean {
    return this.parseJwt(token).exp <  (Date.now() / 1000);
  }
  private parseJwt(token:string)  {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };
  public addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
      return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } })
    }
  public getNewTokens(refreshToken: string): string{
     return "a";
  }
 
  
  
}
