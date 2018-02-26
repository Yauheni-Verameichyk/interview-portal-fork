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

import { ListBean } from '../models/list-bean';
import { CandidateDTO } from '../models/candidate-dto';

/**
 * Candidate Controller
 */
 @Injectable()
export class CandidateControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param page page
   * @return OK
   */
   findPageUsingGETResponse(page?: number): Observable<HttpResponse<ListBean<CandidateDTO>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (page != null) __params = __params.set("page", page.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/candidate`,
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
        let _body: ListBean<CandidateDTO> = null;
        _body = _resp.body as ListBean<CandidateDTO>
        return _resp.clone({body: _body}) as HttpResponse<ListBean<CandidateDTO>>;
      })
    );
  }

  /**
   * @param page page
   * @return OK
   */
   findCandidatePage(page?: number): Observable<ListBean<CandidateDTO>> {
    return this.findPageUsingGETResponse(page).pipe(
      map(_r => _r.body)
    );
  }
}

export module CandidateControllerService {
}
