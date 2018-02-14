import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPageComponent } from './component/user-page/user-page.component';
import { DisciplinePageComponent } from './component/discipline-page/discipline-page.component';


const appRoutes: Routes = [
  { path: 'user', component: UserPageComponent},
  { path: 'discipline', component: DisciplinePageComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
