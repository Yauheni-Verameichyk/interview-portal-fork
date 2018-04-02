import { Component, OnInit } from '@angular/core';
import { SpecifiedTimeDTO } from '../../api/models/specified-time-dto';
import { SpecifiedTime } from '../../api/models/specified-time';
import { Subject } from 'rxjs/Subject';
import { CalendarService } from '../service/calendar.service';
import { UserBaseInfoDTO } from '../../api/models/user-base-info-dto';
import { SpecifiedTimeControllerService } from '../../api/services/specified-time-controller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import 'rxjs/add/operator/takeUntil';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ng4-validators';
import { LightFieldService } from '../../shared/validator/service/light-field.service';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.css']
})
export class CalendarFormComponent implements OnInit, OnDestroy {

  specifiedTimeDTO: SpecifiedTimeDTO;
  specifiedTime: SpecifiedTime = new SpecifiedTime();
  refresh: Subject<any> = new Subject();
  specifiedTimeForm: FormGroup;
  private readonly destroy: Subject<void> = new Subject();
  constructor(
    private specifiedTimeControllerService: SpecifiedTimeControllerService,
    private calendarService: CalendarService,
    private route: ActivatedRoute,
    private popupService: PopupService,
    private router: Router,
    private lightFieldService: LightFieldService) { }

  ngOnInit() {
    this.specifiedTimeForm = this.calendarService.initFormGroup(this.specifiedTime);
    this.initializeSpecifiedTime();
    this.updateValidatorsForRepeatable();
    this.updateValidatorsForEndTime();
  }

  initializeSpecifiedTime(): void {
    if (+this.route.snapshot.paramMap.get('specifiedTimeId')) {
      this.specifiedTimeControllerService
        .findByIdUsingGET_3(+this.route.snapshot.paramMap.get('specifiedTimeId'))
        .takeUntil(this.destroy)
        .subscribe(specifiedTimeDTO => {
          this.specifiedTimeDTO = specifiedTimeDTO;
          this.specifiedTime = this.calendarService.convertDTOToSpecifiedTime(specifiedTimeDTO);
        }, error => {
          this.popupService.displayMessage('Error during specified time getting', this.router);
        });
    } else {
      this.specifiedTime.startTime = this.calendarService.getCurrentDate();
      this.specifiedTime.endTime = this.calendarService.getCurrentDate();
      this.specifiedTime.duration = 1;
      this.specifiedTime.repeatPeriod = 1;
    }
  }

  updateValidatorsForRepeatable() {
    this.specifiedTimeForm.get('isRepeatable').valueChanges
      .takeUntil(this.destroy)
      .subscribe(isRepeatable => {
        if (isRepeatable) {
          this.calendarService.setValidatorsForRepeatable(this.specifiedTimeForm);
        } else {
          this.calendarService.setValidatorsForNonRepeatable(this.specifiedTimeForm);
        }
      });
  }

  updateValidatorsForEndTime() {
    this.specifiedTimeForm.get('startTime').valueChanges
      .takeUntil(this.destroy)
      .subscribe(isRepeatable => {
        this.calendarService.updateEndTimeValidator(this.specifiedTimeForm);
      });
  }

  sendSpecifiedTime() {
    if (this.specifiedTimeForm.valid) {
      if (!this.specifiedTime.isRepeatable) { this.specifiedTime.endTime = null; }
      this.specifiedTimeDTO = this.calendarService.convertSpecifiedTimeToDTO(this.specifiedTime);
      this.specifiedTimeControllerService.saveUsingPOST_2(this.specifiedTimeDTO)
        .takeUntil(this.destroy)
        .subscribe(response => {
          this.router.navigate(['calendar']);
          this.popupService.displayMessage('Specified time was saved', this.router);
        },
          error => {
            this.popupService.displayMessage('Error during specified time saving', this.router);
          });
    } else {
      this.lightFieldService.lightField(this.specifiedTimeForm.controls);
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
