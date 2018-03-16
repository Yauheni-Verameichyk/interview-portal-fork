/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse,
  HttpHeaders, HttpParams
} from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';

import { CandidateDTO } from '../models/candidate-dto';
import { Candidate } from '../models/candidate';
import { ResponseEntity } from '../models/response-entity';

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
  findAllUsingGETResponse(page?: number): Observable<HttpResponse<CandidateDTO[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (page != null) __params = __params.set("quantity", page.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/candidates`,
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
        let _body: CandidateDTO[] = null;
        _body = _resp.body as CandidateDTO[]
        return _resp.clone({ body: _body }) as HttpResponse<CandidateDTO[]>;
      })
    );
  }

  /**
   * @param page page
   * @return OK
   */
  findAll(page?: number): Observable<CandidateDTO[]> {
    return this.findAllUsingGETResponse(page).pipe(
      map(_r => _r.body)
    );
  }

  /**
  * @param candidate candidate
  * @return OK
  */
  addUsingPOSTResponse(candidate: Candidate): Observable<HttpResponse<ResponseEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = candidate;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/candidates`,
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
        let _body: ResponseEntity = null;
        _body = _resp.body as ResponseEntity
        return _resp.clone({ body: _body }) as HttpResponse<ResponseEntity>;
      })
    );
  }

  /**
   * @param candidate candidate
   * @return OK
   */
  addUsingPOST(candidate: Candidate): Observable<ResponseEntity> {
    return this.addUsingPOSTResponse(candidate).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param candidate candidate
   */
  updateUsingPUTResponse(candidate: Candidate): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = candidate;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/candidates`,
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

        return _resp.clone({ body: _body }) as HttpResponse<void>;
      })
    );
  }

  /**
   * @param candidate candidate
   */
  updateUsingPUT(candidate: Candidate): Observable<void> {
    return this.updateUsingPUTResponse(candidate).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param id id
   * @return OK
   */
  findByIdUsingGETResponse(id: number): Observable<HttpResponse<Candidate>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/candidates/${id}`,
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
        let _body: Candidate = null;
        _body = _resp.body as Candidate
        return _resp.clone({ body: _body }) as HttpResponse<Candidate>;
      })
    );
  }

  /**
   * @param id id
   * @return OK
   */
  findByIdUsingGET(id: number): Observable<Candidate> {
    return this.findByIdUsingGETResponse(id).pipe(
      map(response => {
        const candidate = response.body;
        candidate.candidateEducationList.forEach(education => {
          education.endDate = this.bringDateFormat(education.endDate);
          education.startDate = this.bringDateFormat(education.startDate);
        });
        candidate.candidateWorkList.forEach(work => {
          work.endDate = this.bringDateFormat(work.endDate);
          work.startDate = this.bringDateFormat(work.startDate);
        })
        return candidate;
      })
    );
  }

  private bringDateFormat(dateStr: string): string {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return ((String(year).length == 1) ? "0" + year : year) + "-"
      + ((String(month).length == 1) ? "0" + month : month) + "-"
      + ((String(day).length == 1) ? "0" + day : day);
  }

}

export module CandidateControllerService {
}