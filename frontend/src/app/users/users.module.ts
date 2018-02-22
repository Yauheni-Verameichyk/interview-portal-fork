import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule, usersRouterComponents } from './users.routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { UserService } from './service/user.service';
import { UserControllerService } from '../api/rest/service/user-controller.service';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  declarations: [
    usersRouterComponents,
    UserComponent
  ],
  providers: [
    UserService,
    UserControllerService
  ]
})
export class UsersModule { }
