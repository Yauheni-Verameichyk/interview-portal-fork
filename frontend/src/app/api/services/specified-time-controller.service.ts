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
   * @param specifiedTimeDTO specifiedTimeDTO
   */
   saveUsingPOST_2Response(specifiedTimeDTO: SpecifiedTimeDTO): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = specifiedTimeDTO;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/slots`,
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
   * @param specifiedTimeDTO specifiedTimeDTO
   */
   saveUsingPOST_2(specifiedTimeDTO: SpecifiedTimeDTO): Observable<void> {
    return this.saveUsingPOST_2Response(specifiedTimeDTO).pipe(
      map(_r => _r.body)
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

  /**
   * @param id id
   * @return OK
   */
   findByIdUsingGET_3Response(id: number): Observable<HttpResponse<SpecifiedTimeDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/slots/${id}`,
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
        let _body: SpecifiedTimeDTO = null;
        _body = _resp.body as SpecifiedTimeDTO
        return _resp.clone({body: _body}) as HttpResponse<SpecifiedTimeDTO>;
      })
    );
  }

  /**
   * @param id id
   * @return OK
   */
   findByIdUsingGET_3(id: number): Observable<SpecifiedTimeDTO> {
    return this.findByIdUsingGET_3Response(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id id
   */
   deleteUsingDELETE_1Response(id: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/slots/${id}`,
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
   * @param id id
   */
   deleteUsingDELETE_1(id: number): Observable<void> {
    return this.deleteUsingDELETE_1Response(id).pipe(
      map(_r => _r.body)
    );
  }

    /**
   * @param id id
   */
  deleteByGroupIdUsingDELETEResponse(id: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/slots/group/${id}`,
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
   * @param id id
   */
   deleteByGroupIdUsingDELETE(id: number): Observable<void> {
    return this.deleteByGroupIdUsingDELETEResponse(id).pipe(
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
