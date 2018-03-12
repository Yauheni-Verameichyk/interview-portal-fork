import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CandidateListComponent } from './candidate-list/candidate-list.component'
import { CandidateComponent } from './candidate/candidate.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { CandidateResolvedGuard } from '../guard/candidate-resolved.guard';

const routes: Routes = [
    {
        path: 'candidate',
        component: CandidateListComponent
    },
    {
        path: 'candidate-create',
        component: CandidateFormComponent,
        outlet: 'popup'
    },
    {
        path: 'candidate-view/:id',
        component: CandidateFormComponent,
        outlet: 'popup',
        resolve: {
            candidate: CandidateResolvedGuard
        }
    },
    {
        path: 'candidate-update/:id',
        component: CandidateFormComponent,
        outlet: 'popup',
        resolve: {
            candidate: CandidateResolvedGuard
        }
    }
];
export let candidatesRouterComponent = [CandidateListComponent, CandidateComponent];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)

    ],
    declarations: [],
    exports: [RouterModule]
})
export class CandidatesRoutingModule { }