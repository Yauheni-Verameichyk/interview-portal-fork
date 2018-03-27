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

import { SpecifiedTimeDTO } from '../models/specified-time-dto';

/**
 * Specified Time Controller
 */
 @Injectable()
export class SpecifiedTimeControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `SpecifiedTimeControllerService.FindAllInRangeUsingGETParams` containing the following parameters:
   *
   * - `rangeStart`: rangeStart
   *
   * - `rangeEnd`: rangeEnd
   *
   * - `disciplineId`: disciplineId
   *
   * @return OK
   */
   findAllInRangeUsingGETResponse(params: SpecifiedTimeControllerService.FindAllInRangeUsingGETParams): Observable<HttpResponse<SpecifiedTimeDTO[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/slots/discipline/${params.rangeStart}/${params.rangeEnd}/${params.disciplineId}`,
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
        let _body: SpecifiedTimeDTO[] = null;
        _body = _resp.body as SpecifiedTimeDTO[]
        return _resp.clone({body: _body}) as HttpResponse<SpecifiedTimeDTO[]>;
      })
    );
  }

  /**
   * @param params The `SpecifiedTimeControllerService.FindAllInRangeUsingGETParams` containing the following parameters:
   *
   * - `rangeStart`: rangeStart
   *
   * - `rangeEnd`: rangeEnd
   *
   * - `disciplineId`: disciplineId
   *
   * @return OK
   */
   findAllInRangeUsingGET(params: SpecifiedTimeControllerService.FindAllInRangeUsingGETParams): Observable<SpecifiedTimeDTO[]> {
    return this.findAllInRangeUsingGETResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `SpecifiedTimeControllerService.FindAllForUserInRangeUsingGETParams` containing the following parameters:
   *
   * - `userId`: userId
   *
   * - `rangeStart`: rangeStart
   *
   * - `rangeEnd`: rangeEnd
   *
   * @return OK
   */
   findAllForUserInRangeUsingGETResponse(params: SpecifiedTimeControllerService.FindAllForUserInRangeUsingGETParams): Observable<HttpResponse<SpecifiedTimeDTO[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/slots/user/${params.rangeStart}/${params.rangeEnd}`,
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
        let _body: SpecifiedTimeDTO[] = null;
        _body = _resp.body as SpecifiedTimeDTO[]
        return _resp.clone({body: _body}) as HttpResponse<SpecifiedTimeDTO[]>;
      })
    );
  }

  /**
   * @param params The `SpecifiedTimeControllerService.FindAllForUserInRangeUsingGETParams` containing the following parameters:
   *
   * - `userId`: userId
   *
   * - `rangeStart`: rangeStart
   *
   * - `rangeEnd`: rangeEnd
   *
   * @return OK
   */
   findAllForUserInRangeUsingGET(params: SpecifiedTimeControllerService.FindAllForUserInRangeUsingGETParams): Observable<SpecifiedTimeDTO[]> {
    return this.findAllForUserInRangeUsingGETResponse(params).pipe(
      map(_r => _r.body)
    );
  }
}

export module SpecifiedTimeControllerService {

  /**
   * Parameters for findAllInRangeUsingGET
   */
   export interface FindAllInRangeUsingGETParams {

    /**
     * rangeStart
     */
     rangeStart: string;

    /**
     * rangeEnd
     */
     rangeEnd: string;

    /**
     * disciplineId
     */
     disciplineId: number;
  }

  /**
   * Parameters for findAllForUserInRangeUsingGET
   */
   export interface FindAllForUserInRangeUsingGETParams {

    /**
     * rangeStart
     */
     rangeStart: string;

    /**
     * rangeEnd
     */
     rangeEnd: string;
  }
}
