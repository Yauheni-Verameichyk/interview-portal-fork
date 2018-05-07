import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InterviewListComponent } from './interview-list/interview-list.component';
import { InterviewComponent } from './interview/interview.component';
import { InterviewFormComponent } from './interview-form/interview-form.component';
import { InterviewResolvedGuard } from '../guard/interview-resolved.guard';

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
        outlet: 'popup',
        resolve: {
            interview: InterviewResolvedGuard
        }
    },
    {
        path: 'interview-update/:id',
        component: InterviewFormComponent,
        outlet: 'popup',
        resolve: {
            interview: InterviewResolvedGuard
        }
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