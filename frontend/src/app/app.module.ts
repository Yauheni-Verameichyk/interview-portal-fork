import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule, appRouterComponents } from './app.routing.module';
import { AuthenticationControllerService } from './api/rest/service/authentication-controller.service';
import { AuthenticationService } from './service/authentication/authentication.service';
import { AuthGuard } from './guard/auth.guard';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersModule } from './users/users.module';
import { AuthenticationInterceptor } from './interceptor/authentication-interceptor';
import { NavbarManager } from './service/navbar/navbar-manager';
import { NavbarComponent } from './component/navbar/navbar.component';



@NgModule({
  declarations: [
    AppComponent,
    appRouterComponents,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UsersModule,
    AppRoutingModule
  ],
  providers: [
    AuthenticationControllerService,
    AuthenticationService,
    AuthGuard,
    NavbarManager,
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
