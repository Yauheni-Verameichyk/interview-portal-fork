import { Injectable } from '@angular/core';
import { Authentication } from '../../../domain/Authentication';

import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { UserCredentials } from '../../../domain/UserCredentials';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthenticationControllerService {
  
  private baseUrl:string = environment.backendUrl+'/auth';
  constructor(private http: HttpClient){}

  authorizationUserPOST(user: Authentication): Observable<UserCredentials> {
    const body = JSON.stringify(user),
    options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(this.baseUrl, body, options).pipe(map(this.handlerData), catchError(this.handlerError));
  };
  getNewAccessAndRefrehToken( refreshToken: String): Observable<UserCredentials> {
    const body = refreshToken, 
     options = {
       headers: new HttpHeaders({'Content-Type': 'application/json'})
     },
     url = this.baseUrl+"/refresh";
     return this.http.post(url, body, options).pipe(map(this.handlerData), catchError(this.handlerError));
   }
  handlerData(response: HttpResponse<UserCredentials>) {
    let body = response;
    return body || {}
  };
  handlerError(err: HttpErrorResponse) {
    let errorMessage : string;
    if(err.error instanceof Error){
      errorMessage  = `An error occurred: ${err.error.message}`;
    }else{
      errorMessage = `Backend return code: ${err.status}, body was : ${err.error}`
    }
    console.log(errorMessage);
    return Observable.throw(errorMessage);
  };
}
