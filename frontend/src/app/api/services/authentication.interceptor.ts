import { Injectable } from '@angular/core';
import { HttpInterceptorHandler } from '@angular/common/http/src/interceptor';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationControllerService } from './authentication-controller.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    if(localStorage.getItem("token")) {
      req = req.clone({
        setHeaders: {
          Authorization: "Bearer "+localStorage.getItem("token")
        }
      });
    }
    return next.handle(req);
  }
  

}
