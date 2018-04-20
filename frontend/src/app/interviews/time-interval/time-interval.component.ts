import { Component, OnInit, ChangeDetectorRef, forwardRef, Input } from '@angular/core';
import { NgbDatepickerConfig, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateTimeInterval } from '../model/date-time-interval';
import { getSeconds, getHours, getMinutes, getDay, getMonth, getYear, getDate } from 'date-fns';

const now = new Date();

export const TIME_INTERVAL_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TimeIntervalComponent),
  multi: true
};

@Component({
  selector: 'app-time-interval',
  templateUrl: './time-interval.component.html',
  styleUrls: ['./time-interval.component.css'],
  providers: [NgbDatepickerConfig, TIME_INTERVAL_CONTROL_VALUE_ACCESSOR]
})
export class TimeIntervalComponent implements ControlValueAccessor {

  @Input() interval: DateTimeInterval = {
    startDate: new Date(),
    endDate: new Date()
  };

  dateModel: NgbDateStruct;
  startTimeModel: NgbTimeStruct;
  endTimeModel: NgbTimeStruct;
  date: { year: number, month: number };
  minDate: NgbDateStruct;

  onTouched = () => { };

  selectToday() {
    this.dateModel = {
      day: getDate(now),
      month: getMonth(now) + 1,
      year: getYear(now)
    };
    this.startTimeModel = {
      second: 0,
      hour: getHours(now) + 1,
      minute: 0
    };
    this.endTimeModel = {
      second: 0,
      hour: getHours(now) + 2,
      minute: 0
    };
    this.minDate = {
      day: getDate(now),
      month: getMonth(now) + 1,
      year: getYear(now)
    };
  }

  private onChangeCallback: (interval: DateTimeInterval) => void = () => { };

  constructor(private cdr: ChangeDetectorRef) { }

  writeValue(interval: DateTimeInterval): void {
    if (interval) {
      this.interval = interval;
    } else {
      this.selectToday();
    }
    this.refreshDate();
    this.cdr.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  refreshStartTime() {
    if (this.startTimeModel.hour === 0) {
      this.endTimeModel = { hour: 1, minute: 0, second: 0 }
    }
    let startTime = (this.startTimeModel.hour + 1) * 60 + this.startTimeModel.minute;
    let endTime = this.endTimeModel.hour * 60 + this.endTimeModel.minute;
    if (startTime > (endTime + 40)) {
      this.endTimeModel = {
        hour: this.startTimeModel.hour + 1,
        minute: this.startTimeModel.minute,
        second: 0
      }
    }
    this.refreshDate();
  }

  refreshDate() {
    let stringDate = this.dateModel.year + "/" + (this.dateModel.month) + "/" + this.dateModel.day;
    this.interval.startDate = new Date(stringDate);
    this.interval.endDate = new Date(stringDate);
    this.interval.startDate.setHours(this.startTimeModel.hour);
    this.interval.startDate.setMinutes(this.startTimeModel.minute);
    this.interval.endDate.setHours(this.endTimeModel.hour);
    this.interval.endDate.setMinutes(this.endTimeModel.minute);
    this.interval.startStringDate = this.convertDateToString(this.interval.startDate);
    this.interval.endStringDate = this.convertDateToString(this.interval.endDate);
    this.onChangeCallback(this.interval);
  }

  refreshEndTime() {
    if (this.endTimeModel.hour === 0) {
      this.startTimeModel = { hour: 23, minute: 0, second: 0 }
    } else {
      let startTime = this.startTimeModel.hour * 60 + this.startTimeModel.minute;
      let endTime = this.endTimeModel.hour * 60 + this.endTimeModel.minute;
      if ((endTime - 20) < (startTime)) {
        this.startTimeModel = {
          hour: this.endTimeModel.hour - 1,
          minute: this.endTimeModel.minute,
          second: 0
        }
      }
    }
    this.refreshDate();
  }

  convertDateToString(date: Date) {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, -5);
  }

}
