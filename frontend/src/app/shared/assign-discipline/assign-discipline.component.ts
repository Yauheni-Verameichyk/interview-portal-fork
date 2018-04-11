import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { UserFormMangerService } from '../select-role/service/user-form-manger.service';
import { DisciplineControllerService } from '../../api/services';
import { DisciplineDTO } from '../../api/models';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-assign-discipline',
  templateUrl: './assign-discipline.component.html',
  styleUrls: ['./assign-discipline.component.css']
})
export class AssignDisciplineComponent implements OnInit, OnDestroy {
  private readonly destroy: Subject<void> = new Subject();
  @Output() editAssignDiscipline = new EventEmitter<{ [key: string]: DisciplineDTO[] }>();
  @Input() assignDiscipline: { [key: string]: DisciplineDTO[] };
  assignDisciplineForUser: DisciplineDTO[];
  typeRole: string;
  newListDiscipline: DisciplineDTO[];
  isNewAssignDisciplineShown = false;
  isShowButton;

  constructor(private userFormManager: UserFormMangerService, private disciplineController: DisciplineControllerService) {
    userFormManager.showButtonEmitter
      .takeUntil(this.destroy)
      .subscribe(isShow => {
        this.isShowButton = isShow;
      });
  }
  ngOnInit() {
    Object.keys(this.assignDiscipline).map(typeRole => {
      this.typeRole = typeRole;
    });
    this.assignDisciplineForUser = this.assignDiscipline[this.typeRole];
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
  renderRole(role: string): string {
    return this.userFormManager.formatString(role);
  }
  disciplineChange(): void {
    this.assignDiscipline[this.typeRole] = this.assignDisciplineForUser;
    this.editAssignDiscipline.emit(this.assignDiscipline);
  }
  deleteDiscipline(index: number) {
    this.assignDisciplineForUser.splice(index, 1);
    this.disciplineChange();
  }
  addNewDiscipline() {
    this.disciplineController.findAllUsingGET()
      .takeUntil(this.destroy)
      .subscribe(allDisciplines => {
        this.newListDiscipline =
         this.userFormManager.getNotExistDiscipline(this.assignDisciplineForUser, allDisciplines);
         this.newListDiscipline.length > 0 ?  this.isNewAssignDisciplineShown = true :  this.isNewAssignDisciplineShown = false;
      });
  }
  assignNewDiscipline(index: number) {
    this.assignDisciplineForUser.push(this.newListDiscipline[index]);
    this.newListDiscipline.splice(index, 1);
    this.disciplineChange();
    this.newListDiscipline.length <= 0
      ? this.isNewAssignDisciplineShown = false
      : this.isNewAssignDisciplineShown = true;
  }

}
