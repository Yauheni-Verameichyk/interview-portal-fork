import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InterviewListComponent } from './interview-list/interview-list.component';
import { InterviewComponent } from './interview/interview.component';


const routes: Routes = [
    {
        path: 'interview',
        component: InterviewListComponent
    }
];

export let interviewsRouterComponent = [InterviewListComponent, InterviewComponent]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class InterviewsRoutingModule { }