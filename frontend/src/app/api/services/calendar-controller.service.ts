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

import { CalendarDTO } from '../models/calendar-dto';

/**
 * Calendar Controller
 */
 @Injectable()
export class CalendarControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `CalendarControllerService.FindAllForUserInRangeUsingGETParams` containing the following parameters:
   *
   * - `rangeStart`: rangeStart
   *
   * - `rangeEnd`: rangeEnd
   *
   * @return OK
   */
   findAllForUserInRangeUsingGETResponse(params: CalendarControllerService.FindAllForUserInRangeUsingGETParams): Observable<HttpResponse<CalendarDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/calendar/user/${params.rangeStart}/${params.rangeEnd}`,
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
        let _body: CalendarDTO = null;
        _body = _resp.body as CalendarDTO
        return _resp.clone({body: _body}) as HttpResponse<CalendarDTO>;
      })
    );
  }

  /**
   * @param params The `CalendarControllerService.FindAllForUserInRangeUsingGETParams` containing the following parameters:
   *
   * - `rangeStart`: rangeStart
   *
   * - `rangeEnd`: rangeEnd
   *
   * @return OK
   */
   findAllForUserInRangeUsingGET(params: CalendarControllerService.FindAllForUserInRangeUsingGETParams): Observable<CalendarDTO> {
    return this.findAllForUserInRangeUsingGETResponse(params).pipe(
      map(_r => _r.body)
    );
  }
}

export module CalendarControllerService {

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
