import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DisciplinesListComponent } from './disciplines-list/disciplines-list.component';
import { DisciplineComponent } from './discipline/discipline.component';
import { CreateDisciplineComponent } from './create-discipline/create-discipline.component';
const routes: Routes = [
  { path: 'discipline', component: DisciplinesListComponent },
  { path: 'discipline/create', component: CreateDisciplineComponent, outlet: 'popup' },
  { path: 'discipline/edit/:editDisciplineID', component: CreateDisciplineComponent, outlet: 'popup' },
  { path: 'discipline/create/:parentDisciplineID', component: CreateDisciplineComponent, outlet: 'popup' }
];
export let disciplineRouterComponents = [DisciplinesListComponent, DisciplineComponent, CreateDisciplineComponent];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class DisciplineRoutingModule { }
