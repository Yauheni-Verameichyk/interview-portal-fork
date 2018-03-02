import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CandidatesRoutingModule, candidatesRouterComponent } from './candidates.routing.module';
import { CandidateComponent } from './candidate-list/candidate/candidate.component';
import { CandidateService } from './service/candidate.service';
import { CandidateControllerService } from '../api/services/candidate-controller.service';
import { CandidateFormComponent } from './candidate-list/candidate-form/candidate-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from '../message/message.module';
import { MessageWindowComponent } from '../message/message-window/message-window.component';
import { EducationTableComponent } from './candidate-list/candidate-form/education-table/education-table.component';
import { WorkTableComponent } from './candidate-list/candidate-form/work-table/work-table.component';
import { DisciplineListComponent } from './candidate-list/candidate-form/discipline-list/discipline-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CandidatesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    SharedModule
  ],
  declarations: [
    candidatesRouterComponent,
    CandidateListComponent,
    CandidateComponent,
    CandidateFormComponent,
    EducationTableComponent,
    WorkTableComponent,
    DisciplineListComponent
  ],
  providers: [
    CandidateControllerService,
    CandidateService
  ]
})
export class CandidatesModule { }
