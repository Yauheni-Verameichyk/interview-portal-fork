import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';

import { DisciplineControllerService } from './services/discipline-controller.service';
import { UserControllerService } from './services/user-controller.service';

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
   UserControllerService
  ],
})
export class ApiModule { }
