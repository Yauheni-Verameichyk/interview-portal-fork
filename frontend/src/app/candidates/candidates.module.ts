import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CandidatesRoutingModule, candidatesRouterComponent } from './candidates.routing.module';
import { CandidateComponent } from './candidate/candidate.component';
import { CandidateService } from './service/candidate.service';
import { CandidateControllerService } from '../api/services/candidate-controller.service';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EducationTableComponent } from './candidate-form/education-table/education-table.component';
import { WorkTableComponent } from './candidate-form/work-table/work-table.component';
import { DisciplineListComponent } from './candidate-form/discipline-list/discipline-list.component';
import { SharedModule } from '../shared/shared.module';
import { CandidateResolvedGuard } from '../guard/candidate-resolved.guard';
import { CandidateFormService } from './candidate-form/service/candidate-form.service';

@NgModule({
  imports: [
    CommonModule,
    CandidatesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
    CandidateResolvedGuard,
    CandidateService,
    CandidateFormService
  ]
})
export class CandidatesModule { }
