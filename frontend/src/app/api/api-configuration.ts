/* tslint:disable */
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

/**
 * Contains global configuration for API services
 */
@Injectable()
export class ApiConfiguration {
  rootUrl: string = environment.backendUrl;
}
