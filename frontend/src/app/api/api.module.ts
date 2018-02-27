import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';

import { AuthenticationControllerService } from './services/authentication-controller.service';
import { DisciplineControllerService } from './services/discipline-controller.service';
import { UserControllerService } from './services/user-controller.service';
import { CandidateControllerService } from './services/candidate-controller.service';
import { BaseService } from './base-service';
import { AuthenticationInterceptor } from './services/authentication.interceptor'


/**
 * Module that provides instances for all API services
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    AuthenticationControllerService,
    DisciplineControllerService,
    UserControllerService,
    CandidateControllerService, 
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
  ],
})
export class ApiModule { }
