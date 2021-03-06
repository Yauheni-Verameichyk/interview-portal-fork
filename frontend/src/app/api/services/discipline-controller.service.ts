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

import { Discipline } from '../models/discipline';

/**
 * Discipline Controller
 */
 @Injectable()
export class DisciplineControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return OK
   */
   findAllUsingGETResponse(): Observable<HttpResponse<Discipline[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/discipline`,
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
        let _body: Discipline[] = null;
        _body = _resp.body as Discipline[]
        return _resp.clone({body: _body}) as HttpResponse<Discipline[]>;
      })
    );
  }

  /**
   * @return OK
   */
   findAllUsingGET(): Observable<Discipline[]> {
    return this.findAllUsingGETResponse().pipe(
      map(_r => _r.body)
    );
  }

    /**
   * @return OK
   */
  findSubItemsGETResponse(id: number): Observable<HttpResponse<Discipline[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/discipline/${id}`,
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
        let _body: Discipline[] = null;
        _body = _resp.body as Discipline[]
        return _resp.clone({body: _body}) as HttpResponse<Discipline[]>;
      })
    );
  }

  /**
   * @return OK
   */
   findSubItemsUsingGET(id: number): Observable<Discipline[]> {
    return this.findSubItemsGETResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param discipline discipline
   */
   saveUsingPUTResponse(discipline: Discipline): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = discipline;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/discipline`,
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
   * @param discipline discipline
   */
   saveUsingPUT(discipline: Discipline): Observable<void> {
    return this.saveUsingPUTResponse(discipline).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id id
   * @return OK
   */
   findByIdUsingGETResponse(id: number): Observable<HttpResponse<Discipline>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/discipline/${id}`,
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
        let _body: Discipline = null;
        _body = _resp.body as Discipline
        return _resp.clone({body: _body}) as HttpResponse<Discipline>;
      })
    );
  }

  /**
   * @param id id
   * @return OK
   */
   findByIdUsingGET(id: number): Observable<Discipline> {
    return this.findByIdUsingGETResponse(id).pipe(
      map(_r => _r.body)
    );
  }
}

export module DisciplineControllerService {
}
