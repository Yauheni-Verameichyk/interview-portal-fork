import { Component, OnInit } from '@angular/core';
import { Discipline } from '../api/models/discipline';
import { DisciplineControllerService } from '../api/services';

@Component({
  selector: 'app-disciplines-list',
  templateUrl: './disciplines-list.component.html',
  styleUrls: ['./disciplines-list.component.css']
})
export class DisciplinesListComponent implements OnInit {

  disciplinesList: Array<Discipline> = [];

  constructor(private disciplinesService: DisciplineControllerService) { }

  ngOnInit() {
    this.disciplinesService.findAllUsingGET().subscribe(disciplines => {
      this.disciplinesList = disciplines;
    })
  }

}
