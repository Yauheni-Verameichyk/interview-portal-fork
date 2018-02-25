import { Component, OnInit } from '@angular/core';
import { Discipline } from '../../api/models/discipline';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-discipline',
  templateUrl: './create-discipline.component.html',
  styleUrls: ['./create-discipline.component.css']
})
export class CreateDisciplineComponent implements OnInit {

  public discipline: Discipline = new Discipline();
  disciplineForm: FormGroup;
  constructor() { 
  }

  ngOnInit() {
    this.disciplineForm = new FormGroup({
      'disciplineName': new FormControl(this.discipline.name, [
        Validators.required,
        Validators.minLength(4),
      ]),
      'disciplineSubscription': new FormControl(this.discipline.subscription)
    });
  }

  sendDiscipline() {
    console.log(this.discipline);
  }

}
