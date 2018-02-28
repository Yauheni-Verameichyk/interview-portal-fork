import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { UserInfo } from '../../../domain/UserInfo';


@Injectable()
export class UserControllerService {
  private baseUrl: string = 'http://localhost:8080/interview-portal/user';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<UserInfo[]> {
    return this.http.get(this.baseUrl)
      .pipe
      (map(this.handlerData),
      catchError(this.handlerError)
      );
  }

  handlerData(response: HttpResponse<UserInfo>) {
    let body = response;
    return body || {}
  }
  handlerError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend return code: ${err.status}, body was : ${err.error}`
    }
    console.log(errorMessage);
    return Observable.throw(errorMessage);
  }
}
