import { Component, OnInit, Input } from '@angular/core';
import { Discipline } from '../api/models/discipline';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.css']
})
export class DisciplineComponent implements OnInit {

  @Input() public discipline: Discipline;
  public subDisciplines: Array<Discipline> = [];
  constructor() { }

  ngOnInit() {
  }

}
