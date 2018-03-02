import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs';
import { Discipline } from '../../api/models';
import { DisciplineControllerService } from '../../api/services';
import { Observable } from 'rxjs/Observable';
import { DisciplineService } from '../service/discipline.service';
import { AuthenticationService } from '../../service/authentication/authentication.service';

@Component({
  selector: 'app-disciplines-list',
  templateUrl: './disciplines-list.component.html',
  styleUrls: ['./disciplines-list.component.css']
})
export class DisciplinesListComponent implements OnInit, OnDestroy {

  disciplinesList: Array<Discipline> = [];
  private readonly destroy: Subject<void> = new Subject();
  constructor(private disciplineService: DisciplineService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    (this.authenticationService.isPermissionPresent('DISCIPLINES_FILTER_READ'))
      ? this.findDisciplines('MY') : this.findDisciplines('ALL');
  }

  findDisciplines(searchOption: string): void {
    this.disciplineService.chooseRequest(searchOption)
      .takeUntil(this.destroy)
      .subscribe((disciplines) => {
        this.disciplinesList = disciplines;
      }, (error) => {
        console.log('Send to error page when it appears');
        console.log(error);
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
