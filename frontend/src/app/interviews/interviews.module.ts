import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewsRoutingModule, interviewsRouterComponent } from './interviews.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterviewControllerService } from '../api/services/interview-controller.service'; 
import { TableHeadComponent } from './interview-list/table-head/table-head.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeIntervalComponent } from './time-interval/time-interval.component';
import { InterviewCandidateComponent } from './interview-form/interview-candidate/interview-candidate.component';
import { InterviewDisciplineComponent } from './interview-form/interview-discipline/interview-discipline.component';
import { InterviewersComponent } from './interview-form/interviewers/interviewers.component'
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    InterviewsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ],
  declarations: [
    interviewsRouterComponent,
    TableHeadComponent,
    TimeIntervalComponent,
    InterviewCandidateComponent,
    InterviewDisciplineComponent,
    InterviewersComponent
  ],
  providers: [
    InterviewControllerService
  ]
})
export class InterviewsModule { }
