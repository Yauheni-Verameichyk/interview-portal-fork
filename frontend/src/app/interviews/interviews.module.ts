import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewListComponent } from './interview-list/interview-list.component'
import { InterviewsRoutingModule, interviewsRouterComponent } from './interviews.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    InterviewsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    interviewsRouterComponent
  ]
})
export class InterviewsModule { }
