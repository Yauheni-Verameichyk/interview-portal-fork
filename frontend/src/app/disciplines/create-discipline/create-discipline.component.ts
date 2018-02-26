import { Component, OnInit } from '@angular/core';
import { Discipline } from '../../api/models/discipline';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DisciplineControllerService } from '../../api/services';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-discipline',
  templateUrl: './create-discipline.component.html',
  styleUrls: ['./create-discipline.component.css']
})
export class CreateDisciplineComponent implements OnInit {

  public discipline: Discipline = new Discipline();
  disciplineForm: FormGroup;
  private readonly destroy: Subject<void> = new Subject();
  constructor(private disciplineControllerService: DisciplineControllerService) {
  }

  ngOnInit() {
    this.disciplineForm = new FormGroup({
      'disciplineName': new FormControl(this.discipline.name, [
        Validators.required,
        Validators.minLength(4),
      ]),
      'disciplineSubscription': new FormControl()
    });
    this.discipline.parentId = null;
    console.log(this.disciplineForm);
  }

  sendDiscipline() {
    if (this.disciplineForm.valid) {
      console.log(this.discipline);
      this.disciplineControllerService.saveUsingPUT(this.discipline)
        .takeUntil(this.destroy)
        .subscribe((success) => {
          console.log('Discipline was saved');
        }, error => {
          console.error('Error happened');
        });
    } else {
      console.error('Invalid input');
    }
  }

}
