import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './component/menu/menu.component';
import { LoginComponent } from './component/login/login.component';
import { UserPageComponent } from './component/user-page/user-page.component';
import { DisciplinePageComponent } from './component/discipline-page/discipline-page.component';
import { ApiModule } from './api/api.module';
import { AuthenticationControllerService, UserControllerService } from './api/services';
import { DisciplinesListComponent } from './disciplines-list/disciplines-list.component';
import { DisciplineComponent } from './discipline/discipline.component';
import { DisciplineService } from './discipline.service';
import { ShowAuthedDirective } from './show-authed.directive';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    UserPageComponent,
    DisciplinePageComponent,
    DisciplinesListComponent,
    DisciplineComponent,
    ShowAuthedDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ApiModule
  ],
  providers: [AuthenticationControllerService,
    UserControllerService, DisciplineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
