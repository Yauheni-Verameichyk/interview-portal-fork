import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarFormComponent } from './calendar-form/calendar-form.component';

const routes: Routes = [
  { path: 'calendar', component: CalendarComponent, runGuardsAndResolvers: 'always' },
  { path: 'calendar/create', component: CalendarFormComponent, outlet: 'popup' },
  { path: 'calendar/edit/:specifiedTimeId', component: CalendarFormComponent, outlet: 'popup' },
];

export let calendarRouterComponents = [CalendarComponent, CalendarFormComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
