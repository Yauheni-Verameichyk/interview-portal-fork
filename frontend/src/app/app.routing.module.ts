import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { MessageWindowComponent } from './shared/pop-up-window/message-window/message-window.component';

const routes : Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    // The router will match this route if the URL requested
    // doesn't match any paths for routes defined in our configuration
    path: '**',
    component: PageNotFoundComponent
  },
  {
    path: 'message/:message',
    component: MessageWindowComponent,
    outlet: 'popup'
  }
];

export let appRouterComponents = [LoginComponent, PageNotFoundComponent]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
