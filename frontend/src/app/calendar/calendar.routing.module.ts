import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarFormComponent } from './calendar-form/calendar-form.component';
import { CalendarDeleteFormComponent } from './calendar-delete-form/calendar-delete-form.component';

const routes: Routes = [
  { path: 'calendar', component: CalendarComponent, runGuardsAndResolvers: 'always' },
  { path: 'calendar/create', component: CalendarFormComponent, outlet: 'popup' },
  { path: 'calendar/edit/:specifiedTimeId', component: CalendarFormComponent, outlet: 'popup' },
  {
    path: 'calendar/delete/:specifiedTimeId/start/:startTime/group/:groupId/repeatable/:repeatable',
    component: CalendarDeleteFormComponent, outlet: 'popup'
  },
];

export let calendarRouterComponents = [CalendarComponent, CalendarFormComponent, CalendarDeleteFormComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
