import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserResolvedGuard } from '../guard/user-resolved.guard';
const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'users/:id/info',
    component: UserFormComponent,
    resolve: {
      user: UserResolvedGuard
    }
  },
  {
    path: 'users/:id/edit',
    component: UserFormComponent,
    resolve: {
      user: UserResolvedGuard
    }
  }


];
export let usersRouterComponents = [UserListComponent, UserComponent, UserFormComponent];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
