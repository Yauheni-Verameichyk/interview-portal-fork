import { Component, OnInit, Input } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs';
import { Discipline } from '../../api/models';
import { DisciplineService } from '../service/discipline.service';
import { DisciplineControllerService } from '../../api/services';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.css']
})
export class DisciplineComponent implements OnInit, OnDestroy {

  public subItemsShown = false;
  public backgroundColor: number;
  @Input() public childLevel: number;
  @Input() public parentDisciplineName: string;
  @Input() public discipline: Discipline;
  public subDisciplinesList: Array<Discipline> = [];
  private readonly destroy: Subject<void> = new Subject();

  constructor(private disciplinesControllerService: DisciplineControllerService,
    private disciplineService: DisciplineService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.backgroundColor = this.disciplineService.countBackgroundColor(this.childLevel);
    this.parentDisciplineName = this.disciplineService.convertDisciplineName(this.parentDisciplineName);
  }

  findSubItems(): void {
    this.disciplinesControllerService.findSubItemsUsingGET(this.discipline.id)
      .takeUntil(this.destroy)
      .subscribe(disciplines => {
        this.subDisciplinesList = disciplines;
      }, (error) => {
        console.log('Send to error page when it appears');
      });
  }

  showSubItems(): void {
    (!this.subItemsShown) ? this.findSubItems() : this.subDisciplinesList = [];
    this.subItemsShown = !this.subItemsShown;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
