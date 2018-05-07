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

import { InterviewDTO } from '../models/interview-dto';
import { FullInterviewInfoDTO } from '../models/full-interview-info-dto';

/**
 * Interview Controller
 */
 @Injectable()
export class InterviewControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param quantity quantity
   * @return OK
   */
   findAllUsingGET_2Response(quantity?: number): Observable<HttpResponse<InterviewDTO[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (quantity != null) __params = __params.set("quantity", quantity.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/interviews`,
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
        let _body: InterviewDTO[] = null;
        _body = _resp.body as InterviewDTO[]
        return _resp.clone({body: _body}) as HttpResponse<InterviewDTO[]>;
      })
    );
  }

  /**
   * @param quantity quantity
   * @return OK
   */
   findAllUsingGET_2(quantity?: number): Observable<InterviewDTO[]> {
    return this.findAllUsingGET_2Response(quantity).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param interview interview
   */
   addUsingPOST_1Response(interview: FullInterviewInfoDTO): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = interview;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/interviews`,
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
   * @param interview interview
   */
   addUsingPOST_1(interview: FullInterviewInfoDTO): Observable<void> {
    interview.status = "wait";
    return this.addUsingPOST_1Response(interview).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param interview interview
   */
   updateUsingPUT_1Response(interview: FullInterviewInfoDTO): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = interview;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/interviews`,
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
   * @param interview interview
   */
   updateUsingPUT_1(interview: FullInterviewInfoDTO): Observable<void> {
    return this.updateUsingPUT_1Response(interview).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id id
   * @return OK
   */
   findByIdUsingGET_2Response(id: number): Observable<HttpResponse<FullInterviewInfoDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/interviews/${id}`,
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
        let _body: FullInterviewInfoDTO = null;
        _body = _resp.body as FullInterviewInfoDTO
        return _resp.clone({body: _body}) as HttpResponse<FullInterviewInfoDTO>;
      })
    );
  }

  /**
   * @param id id
   * @return OK
   */
   findByIdUsingGET_2(id: number): Observable<FullInterviewInfoDTO> {
    return this.findByIdUsingGET_2Response(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id id
   */
   deleteUsingDELETE_2Response(id: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/interviews/${id}`,
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
   deleteUsingDELETE_2(id: number): Observable<void> {
    return this.deleteUsingDELETE_2Response(id).pipe(
      map(_r => _r.body)
    );
  }
}

export module InterviewControllerService {
}
