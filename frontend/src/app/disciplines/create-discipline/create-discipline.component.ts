import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { DisciplineControllerService, UserControllerService } from '../../api/services';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { UserInfo } from '../../domain/UserInfo';
import { DisciplineDTO } from '../../api/models/disciplineDTO';

@Component({
  selector: 'app-create-discipline',
  templateUrl: './create-discipline.component.html',
  styleUrls: ['./create-discipline.component.css']
})
export class CreateDisciplineComponent implements OnInit, OnDestroy {

  public discipline: DisciplineDTO = new DisciplineDTO();
  disciplineForm: FormGroup;

  private readonly destroy: Subject<void> = new Subject();
  constructor(private disciplineControllerService: DisciplineControllerService, private fb: FormBuilder,
    private userControllerService: UserControllerService) {
  }

  ngOnInit() {
    this.disciplineForm = new FormGroup({
      'disciplineName': new FormControl(this.discipline.name, [
        Validators.required,
        Validators.minLength(1),
      ]),
      'disciplineSubscription': new FormControl()
    });
    this.discipline.parentId = null;
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
