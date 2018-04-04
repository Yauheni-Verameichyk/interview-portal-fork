import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { UserInfo } from '../../../domain/UserInfo';
import { User } from '../../../domain/User';
import { environment } from '../../../../environments/environment';


@Injectable()
export class UserControllerService {
  private baseUrl: string = environment.backendUrl+'/users';

  constructor(private http: HttpClient) { }

  public getUsers(quantity?: number): Observable<UserInfo[]> {
    const data = {quantity: quantity.toString()};
    return this.http.get(this.baseUrl, {params: data})
      .pipe(map(this.handlerData),
      catchError(this.handlerError)
      );
  }
  public getUserById(id: number) {
    return this.http.get(this.baseUrl + `/${id}`)
      .pipe
      (map(this.handlerData),
      catchError(this.handlerError)
      );
  }

  public updateUser(user: User): Observable<HttpResponse<void>> {
    const body = user,
      options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    return this.http.put(this.baseUrl, body, options).pipe(map(this.handlerData), catchError(this.handlerError));
  }
  public saveUser(user: User): Observable<HttpResponse<void>> {
    const body = user,
      options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    return this.http.post(this.baseUrl, body, options).pipe(map(this.handlerData), catchError(this.handlerError));
  }
  deleteUser(userId: number): Observable<HttpResponse<void>> {
    return this.http.delete(this.baseUrl + `/${userId}`)
    .pipe(map(this.handlerData),
    catchError(this.handlerError)
    );
  }
  handlerData(response: HttpResponse<UserInfo>) {
    const body = response;
    return body || {};
  }
  handlerError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend return code: ${err.status}, body was : ${err.error}`;
    }
    console.log(errorMessage);
    return Observable.throw(errorMessage);
  }
}
