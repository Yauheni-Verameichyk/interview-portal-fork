import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InterviewListComponent } from './interview-list/interview-list.component';
import { InterviewComponent } from './interview/interview.component';
import { InterviewFormComponent } from './interview-form/interview-form.component';


const routes: Routes = [
    {
        path: 'interview',
        component: InterviewListComponent
    },
    {
        path: 'interview-create',
        component: InterviewFormComponent,
        outlet: 'popup'
    },
    {
        path: 'interview-view/:id',
        component: InterviewFormComponent,
        outlet: 'popup'
    },
    {
        path: 'interview-update/:id',
        component: InterviewFormComponent,
        outlet: 'popup'
    }
];

export let interviewsRouterComponent = [InterviewListComponent, InterviewComponent, InterviewFormComponent];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class InterviewsRoutingModule { }