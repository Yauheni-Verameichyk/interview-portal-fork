import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiModule } from '../api/api.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { calendarRouterComponents, CalendarRoutingModule } from './calendar.routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarService } from './service/calendar.service';


@NgModule({
  imports: [
    CommonModule,
    ApiModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarRoutingModule,
    CalendarModule.forRoot(),
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
  ],
  declarations: [
    calendarRouterComponents,
    CalendarComponent,
    CalendarHeaderComponent,
    DateTimePickerComponent
  ],
  providers: [
    CalendarService
  ]
})
export class CustomCalendarModule { }
