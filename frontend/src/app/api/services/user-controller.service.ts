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

import { UserDTO } from '../models/user-dto';

/**
 * User Controller
 */
 @Injectable()
export class UserControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return OK
   */
   findAllUsingGET_1Response(): Observable<HttpResponse<UserDTO[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/user`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: UserDTO[] = null;
        _body = _resp.body as UserDTO[]
        return _resp.clone({body: _body}) as HttpResponse<UserDTO[]>;
      })
    );
  }

  /**
   * @return OK
   */
   findAllUsingGET_1(): Observable<UserDTO[]> {
    return this.findAllUsingGET_1Response().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param userDTO userDTO
   */
   saveUsingPUT_1Response(userDTO: UserDTO): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = userDTO;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/user`,
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
        let _body: void = null;
        
        return _resp.clone({body: _body}) as HttpResponse<void>;
      })
    );
  }

  /**
   * @param userDTO userDTO
   */
   saveUsingPUT_1(userDTO: UserDTO): Observable<void> {
    return this.saveUsingPUT_1Response(userDTO).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id id
   * @return OK
   */
   findByIdUsingGET_1Response(id: number): Observable<HttpResponse<UserDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/user/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: UserDTO = null;
        _body = _resp.body as UserDTO
        return _resp.clone({body: _body}) as HttpResponse<UserDTO>;
      })
    );
  }

  /**
   * @param id id
   * @return OK
   */
   findByIdUsingGET_1(id: number): Observable<UserDTO> {
    return this.findByIdUsingGET_1Response(id).pipe(
      map(_r => _r.body)
    );
  }
}

export module UserControllerService {
}
