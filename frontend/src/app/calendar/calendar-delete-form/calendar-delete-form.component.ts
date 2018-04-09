import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SpecifiedTimeControllerService } from '../../api/services/specified-time-controller.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { ExcludedTimeSlotControllerService } from '../../api/services/excluded-time-slot-controller.service';
import { CalendarService } from '../service/calendar.service';

@Component({
  selector: 'app-calendar-delete-form',
  templateUrl: './calendar-delete-form.component.html',
  styleUrls: ['./calendar-delete-form.component.css']
})
export class CalendarDeleteFormComponent implements OnInit {

  deleteOptionForm: FormGroup;
  deleteOption: string;
  specifiedTimeId: number;
  startTime: string;
  constructor(
    private specifiedTimeControllerService: SpecifiedTimeControllerService,
    private excludedTimeSlotControllerService: ExcludedTimeSlotControllerService,
    private calendarService: CalendarService,
    private router: Router,
    private route: ActivatedRoute,
    private popupService: PopupService) { }

  ngOnInit() {
    this.specifiedTimeId = +this.route.snapshot.paramMap.get('specifiedTimeId');
    this.startTime = this.route.snapshot.paramMap.get('startTime');
    this.deleteOptionForm = new FormGroup({
      'deleteOption': new FormControl([this.deleteOption], [Validators.required])
    });
  }

  deleteSpecifiedTime() {
    switch (this.deleteOption) {
      case 'DELETE_SERIES':
        this.specifiedTimeControllerService.deleteUsingDELETE_1(this.specifiedTimeId).subscribe(
          (success) => this.calendarService.displayDeletedMessage(success),
          (error) => this.calendarService.displayErrorMessage(error));
        break;
      case 'DELETE_OCCURRENCE':
        this.excludedTimeSlotControllerService.saveUsingPOST_1({ startTime: this.startTime }).subscribe(
          (success) => this.calendarService.displayDeletedMessage(success),
          (error) => this.calendarService.displayErrorMessage(error));
        break;
      default:
        throw new Error('Unknown delete option');
    }
  }
}
