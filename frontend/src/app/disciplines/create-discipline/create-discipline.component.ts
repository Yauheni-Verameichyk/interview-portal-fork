import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { DisciplineControllerService, UserControllerService } from '../../api/services';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { UserInfo } from '../../domain/UserInfo';
import { DisciplineDTO } from '../../api/models/disciplineDTO';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { DisciplineService } from '../service/discipline.service';

@Component({
  selector: 'app-create-discipline',
  templateUrl: './create-discipline.component.html',
  styleUrls: ['./create-discipline.component.css']
})
export class CreateDisciplineComponent implements OnInit, OnDestroy {

  public discipline: DisciplineDTO = new DisciplineDTO();
  public disciplineForm: FormGroup;
  public usersListObservable: Observable<UserInfo[]>;

  private readonly destroy: Subject<void> = new Subject();
  constructor(private disciplineControllerService: DisciplineControllerService, private userControllerService: UserControllerService,
    private disciplineService: DisciplineService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.usersListObservable = this.userControllerService.getUsersByRole('DISCIPLINE_HEAD');
    if (+this.route.snapshot.paramMap.get('editDisciplineID')) {
      this.readDiscipline(+this.route.snapshot.paramMap.get('editDisciplineID'), this.disciplineService.createEditOptions.EDIT);
    }
    if (+this.route.snapshot.paramMap.get('parentDisciplineID')) {
      this.readDiscipline(+this.route.snapshot.paramMap.get('parentDisciplineID'),
        this.disciplineService.createEditOptions.CREATE_SUB_ITEM);
    }
    if (!this.route.snapshot.paramMap.get('parentDisciplineID') && this.route.snapshot.paramMap.get('editDisciplineID')) {
      this.discipline.parentId = null;
      this.discipline.parentName = null;
    }
    this.createDisciplineForm();
  }

  createDisciplineForm() {
    this.disciplineForm = new FormGroup({
      'disciplineName': new FormControl([this.discipline.name], [
        Validators.required,
        Validators.minLength(2),
      ]),
      'disciplineSubscription': new FormControl([this.discipline.subscription])
    });
  }

  readDiscipline(disciplineId: number, option: string): void {
    this.disciplineControllerService.findByIdUsingGET(disciplineId)
      .takeUntil(this.destroy)
      .subscribe(
        (discipline) => {
          this.initializeDiscipline(option, discipline);
        }, error => {
          console.error('Error happened');
        }
      );
  }

  initializeDiscipline(option: string, discipline: DisciplineDTO): void {
    switch (option) {
      case this.disciplineService.createEditOptions.EDIT:
        this.discipline = discipline;
        break;
      case this.disciplineService.createEditOptions.CREATE_SUB_ITEM:
        this.discipline.parentId = discipline.id;
        this.discipline.parentName = discipline.name;
        break;
      default:
        Observable.throw('Perhaps you do not know what you want');
    }
  }

  addUsers(users: UserInfo[]) {
    this.discipline.disciplineHeadsList = Array.from(new Set(users));
  }

  sendDiscipline() {
    if (this.disciplineForm.valid) {
      this.disciplineControllerService.saveUsingPOST(this.discipline)
        .takeUntil(this.destroy)
        .subscribe((success) => {
          console.log('Discipline was saved');   //show popup with message
        }, error => {
          console.error('Error happened');
        });
    } else {
      console.error('Invalid input');
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
