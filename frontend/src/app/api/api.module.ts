import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';

import { DisciplineControllerService } from './services/discipline-controller.service';
import { UserControllerService } from './services/user-controller.service';
import { CandidateControllerService } from './services/candidate-controller.service';
import { BaseService } from './base-service';



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
    DisciplineControllerService,
    UserControllerService,
    CandidateControllerService
  ],
})
export class ApiModule { }
