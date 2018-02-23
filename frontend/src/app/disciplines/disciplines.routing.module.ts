import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DisciplinesListComponent } from './disciplines-list/disciplines-list.component';
import { DisciplineComponent } from './discipline/discipline.component';
const routes: Routes = [
  {
    path: 'discipline',
    component: DisciplinesListComponent
  }
];
export let disciplineRouterComponents = [ DisciplinesListComponent, DisciplineComponent ];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class DisciplineRoutingModule { }
