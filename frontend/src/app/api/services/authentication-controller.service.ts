/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse, 
  HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';

import { AuthenticationDTO } from '../models/authentication-dto';

/**
 * Authentication Controller
 */
 @Injectable()
export class AuthenticationControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param request request
   * @return OK
   */
   authorizationUsingPOSTResponse(request: AuthenticationDTO): Observable<HttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = request;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/auth`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: string = null;
        _body = _resp.body as string
        return _resp.clone({body: _body}) as HttpResponse<string>;
      })
    );
  }

  /**
   * @param request request
   * @return OK
   */
   authorizationUsingPOST(request: AuthenticationDTO): Observable<string> {
    return this.authorizationUsingPOSTResponse(request).pipe(
      map(_r => _r.body)
    );
  }

  getToken(): string {
    return localStorage.getItem("token");
  }

}

export module AuthenticationControllerService {
}
