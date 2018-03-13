import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DisciplinesListComponent } from './disciplines-list/disciplines-list.component';
import { DisciplineComponent } from './discipline/discipline.component';
import { DisciplineFormComponent } from './discipline-form/discipline-form.component';

const routes: Routes = [
  { path: 'discipline', component: DisciplinesListComponent },
  { path: 'discipline/create', component: DisciplineFormComponent, outlet: 'popup' },
  { path: 'discipline/edit/:editDisciplineID', component: DisciplineFormComponent, outlet: 'popup' },
  { path: 'discipline/create/:parentDisciplineID', component: DisciplineFormComponent, outlet: 'popup' },
  { path: 'discipline/view/:viewDisciplineID', component: DisciplineFormComponent, outlet: 'popup' }
];
export let disciplineRouterComponents = [DisciplinesListComponent, DisciplineComponent, DisciplineFormComponent];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class DisciplineRoutingModule { }
