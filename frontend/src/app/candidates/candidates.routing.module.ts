import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CandidateListComponent } from './candidate-list/candidate-list.component'
import { CandidateComponent } from './candidate-list/candidate/candidate.component';

const routes: Routes = [
    {
        path: 'candidate',
        component: CandidateListComponent
    }
];
export let candidatesRouterComponent = [ CandidateListComponent, CandidateComponent ];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)

    ],
    declarations: [],
    exports: [RouterModule]
})
export class CandidatesRoutingModule { }