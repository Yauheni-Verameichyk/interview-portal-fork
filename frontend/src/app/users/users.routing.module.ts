import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
const routes: Routes = [
  {
    path: 'user',
    component: UserListComponent
  }
];
export let usersRouterComponents = [ UserListComponent, UserComponent ];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
