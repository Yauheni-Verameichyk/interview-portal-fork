import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisciplineRoutingModule, disciplineRouterComponents } from './disciplines.routing.module';
import { DisciplineComponent } from './discipline/discipline.component';
import { DisciplinesListComponent } from './disciplines-list/disciplines-list.component';
import { DisciplineService } from './service/discipline.service';
import { DisciplineControllerService } from '../api/services';
import { ApiModule } from '../api/api.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    DisciplineRoutingModule,
    ApiModule,
    SharedModule
  ],
  declarations: [
    disciplineRouterComponents,
    DisciplineComponent,
    DisciplinesListComponent
  ],
  providers: [
    DisciplineService,
    DisciplineControllerService
  ]
})
export class DisciplinesModule { }
