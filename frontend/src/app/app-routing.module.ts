import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPageComponent } from './component/user-page/user-page.component';
import { DisciplinePageComponent } from './component/discipline-page/discipline-page.component';
import { DisciplinesListComponent } from './disciplines-list/disciplines-list.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'user', component: UserPageComponent },
  { path: 'discipline', component: DisciplinesListComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
