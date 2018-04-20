import { Component, OnInit, Input } from '@angular/core';
import { DisciplineControllerService } from '../../../api/services';
import { FormGroup } from '@angular/forms';
import { DisciplineDTO } from '../../../api/models/discipline-dto';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-interview-discipline',
  templateUrl: './interview-discipline.component.html',
  styleUrls: ['./interview-discipline.component.css']
})
export class InterviewDisciplineComponent {

  @Input() interviewForm: FormGroup;
  @Input() disciplines: DisciplineDTO[];
  private readonly destroy: Subject<void> = new Subject();

  constructor() { }

}
