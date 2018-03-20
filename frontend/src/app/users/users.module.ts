import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule, usersRouterComponents } from './users.routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { UserService } from './service/user.service';
import { UserControllerService } from '../api/rest/service/user-controller.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserResolvedGuard } from '../guard/user-resolved.guard';
import { SharedModule } from '../shared/shared.module';
import { UserFormMangerService } from '../shared/select-role/service/user-form-manger.service';
import { CreateUserResolvedGuard } from '../guard/create-user-resolved.guard';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    usersRouterComponents,
    UserComponent
  ],
  providers: [
    UserService,
    UserControllerService,
    UserResolvedGuard,
    CreateUserResolvedGuard
  ]
})
export class UsersModule {
  
}
