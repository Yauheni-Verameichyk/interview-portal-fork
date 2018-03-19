import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisciplineRoutingModule, disciplineRouterComponents } from './disciplines.routing.module';
import { DisciplineComponent } from './discipline/discipline.component';
import { DisciplinesListComponent } from './disciplines-list/disciplines-list.component';
import { DisciplineService } from './service/discipline.service';
import { DisciplineControllerService } from '../api/services';
import { ApiModule } from '../api/api.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserControllerService } from '../api/rest/service/user-controller.service';
import { DisciplineFormComponent } from './discipline-form/discipline-form.component';

@NgModule({
  imports: [
    CommonModule,
    DisciplineRoutingModule,
    ApiModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    disciplineRouterComponents,
    DisciplineComponent,
    DisciplinesListComponent,
    DisciplineFormComponent
  ],
  providers: [
    DisciplineService,
    DisciplineControllerService,
    UserControllerService
  ]
})
export class DisciplinesModule { }
