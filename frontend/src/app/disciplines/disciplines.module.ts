import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'angular-tree-component';

import { ApiModule } from '../api/api.module';
import { UserControllerService } from '../api/rest/service/user-controller.service';
import { DisciplineControllerService } from '../api/services';
import { SharedModule } from '../shared/shared.module';
import { DisciplineFormComponent } from './discipline-form/discipline-form.component';
import { DisciplineSearchComponent } from './discipline-search/discipline-search.component';
import { DisciplineComponent } from './discipline/discipline.component';
import { DisciplinesListComponent } from './disciplines-list/disciplines-list.component';
import { disciplineRouterComponents, DisciplineRoutingModule } from './disciplines.routing.module';
import { DisciplineService } from './service/discipline.service';

@NgModule({
  imports: [
    CommonModule,
    DisciplineRoutingModule,
    ApiModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TreeModule,
  ],
  declarations: [
    disciplineRouterComponents,
    DisciplineComponent,
    DisciplinesListComponent,
    DisciplineFormComponent,
    DisciplineSearchComponent
  ],
  providers: [
    DisciplineService,
    DisciplineControllerService,
    UserControllerService
  ]
})
export class DisciplinesModule { }
