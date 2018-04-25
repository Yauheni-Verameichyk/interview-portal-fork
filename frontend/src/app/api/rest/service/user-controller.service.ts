import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { UserInfo } from '../../../domain/UserInfo';
import { User } from '../../../domain/User';
import { environment } from '../../../../environments/environment';
import { URLSearchParams } from '@angular/http';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable()
export class UserControllerService {
  private baseUrl: string = environment.backendUrl + '/users';

  constructor(private http: HttpClient) { }

  public getUsers(_quantity?: number, _parameters?: string): Observable<UserInfo[]> {
    return this.http.get(this.baseUrl, {
      params:
        {
          quantity: _quantity !== undefined ? _quantity.toString() : '0',
          parameters: _parameters !== undefined ? _parameters.toString() : ''
        }
    })
      .pipe(map(this.handlerData),
        catchError(this.handlerError)
      );
  }
  getUsersByParameters(parameters: any): Observable<UserInfo[]> {
    const searchURL = this.baseUrl + '/search';
    return this.http.get(searchURL, { params: { parameters: parameters.toString() } }).pipe(
      map(this.handlerData),
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
