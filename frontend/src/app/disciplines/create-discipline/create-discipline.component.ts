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
    private disciplineService: DisciplineService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (+this.route.snapshot.paramMap.get('editDisciplineID')) {
      this.readDiscipline(+this.route.snapshot.paramMap.get('editDisciplineID'));
    }
    else {
      if (+this.route.snapshot.paramMap.get('parentDisciplineID')) {
        this.readParentDiscipline(+this.route.snapshot.paramMap.get('parentDisciplineID'));
      } else {
        this.discipline.parentId = null;
        this.discipline.parentName = null;
      }
    }
    console.log(this.discipline);
    this.disciplineForm = new FormGroup({
      'disciplineName': new FormControl(this.discipline.name, [
        Validators.required,
        Validators.minLength(1),
      ]),
      'disciplineSubscription': new FormControl()
    });
  }

  readDiscipline(disciplineId: number): void {
    this.disciplineControllerService.findByIdUsingGET(disciplineId)
      .takeUntil(this.destroy)
      .subscribe(
        (discipline) => {
          this.discipline = discipline;
        }, error => {
          console.error('Error happened');
        }
      )
  }

  readParentDiscipline(parentDisciplineId: number): void {
    this.disciplineControllerService.findByIdUsingGET(parentDisciplineId)
      .takeUntil(this.destroy)
      .subscribe(
        (discipline) => {
          this.discipline.parentId = discipline.id;
          this.discipline.parentName = discipline.name;
        }, error => {
          console.error('Error happened');
        }
      )
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
    this.disciplineService.cleanDisciplineService();
    this.destroy.next();
    this.destroy.complete();
  }
}
