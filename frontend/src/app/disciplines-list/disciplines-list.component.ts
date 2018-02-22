import { Component, OnInit } from '@angular/core';
import { Discipline } from '../api/models/discipline';
import { DisciplineControllerService } from '../api/services';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-disciplines-list',
  templateUrl: './disciplines-list.component.html',
  styleUrls: ['./disciplines-list.component.css']
})
export class DisciplinesListComponent implements OnInit, OnDestroy {

  disciplinesList: Array<Discipline> = [];
  private readonly destroy: Subject<void> = new Subject();
  constructor(private disciplinesService: DisciplineControllerService) { }

  ngOnInit(): void {
    this.disciplinesService.findAllUsingGET()
      .takeUntil(this.destroy)
      .subscribe((disciplines) => {
        this.disciplinesList = disciplines;
      }, (error) => {
        console.log('Send to error page when it appears');
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
