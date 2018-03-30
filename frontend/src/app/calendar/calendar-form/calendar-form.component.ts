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

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.css']
})
export class CalendarFormComponent implements OnInit, OnDestroy {

  specifiedTimeDTO: SpecifiedTimeDTO;
  specifiedTime: SpecifiedTime = new SpecifiedTime();
  refresh: Subject<any> = new Subject();
  private readonly destroy: Subject<void> = new Subject();
  constructor(
    private specifiedTimeControllerService: SpecifiedTimeControllerService,
    private calendarService: CalendarService,
    private route: ActivatedRoute,
    private popupService: PopupService,
    private router: Router) { }

  ngOnInit() {
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
      this.specifiedTime.startTime = new Date();
      this.specifiedTime.startTime.setMinutes(0);
      this.specifiedTime.startTime.setSeconds(0);
      this.specifiedTime.duration = 1;
      this.specifiedTime.repeatPeriod = { years: 1, months: 1, weeks: 1 };
    }
  }

  sendSpecifiedTime() {
    if (!this.specifiedTime.isRepeatable) { this.specifiedTime.endTime = null; }
    if (this.specifiedTime.endTime && this.specifiedTime.endTime <= this.specifiedTime.startTime) {
      throw new Error('End time is earlier than start time');
    }
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
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
