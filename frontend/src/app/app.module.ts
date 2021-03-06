import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';

import { LoginComponent } from './component/login/login.component';
import { ApiModule } from './api/api.module';
import { UserControllerService } from './api/services';
import { AppRoutingModule, appRouterComponents } from './app.routing.module';
import { AuthenticationService } from './service/authentication/authentication.service';
import { AuthGuard } from './guard/auth.guard';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersModule } from './users/users.module';
import { AuthenticationInterceptor } from './interceptor/authentication-interceptor';
import { NavbarManager } from './service/navbar/navbar-manager';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AuthenticationControllerService } from './api/rest/service/authentication-controller.service';
import { DisciplinesModule } from './disciplines/disciplines.module';
import { SharedModule } from './shared/shared.module';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    appRouterComponents,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UsersModule,
    DisciplinesModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    AuthenticationControllerService,
    AuthenticationService,
    AuthGuard,
    NavbarManager,
    UserControllerService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
