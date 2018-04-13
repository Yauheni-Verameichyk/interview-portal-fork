import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { DisciplineDTO } from '../../../api/models/discipline';
import { Subject } from 'rxjs';
import { DisciplineControllerService } from '../../../api/services';
import { CandidateFormService } from '../service/candidate-form.service';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-discipline-list',
  templateUrl: './discipline-list.component.html',
  styleUrls: ['./discipline-list.component.css']
})
export class DisciplineListComponent implements OnInit, OnDestroy {

  @Input() candidateForm: FormGroup;
  public disciplines: DisciplineDTO[];
  private readonly destroy: Subject<void> = new Subject();
  readonly messageDisciplineNotSelected: string = "Discipline not selected!!!";

  constructor(
    private disciplinesService: DisciplineControllerService,
    private candidateFormService: CandidateFormService) { }

  ngOnInit(): void {
    this.disciplinesService.findAllUsingGET()
      .takeUntil(this.destroy)
      .subscribe((disciplines) => {
        this.disciplines = disciplines;
      }, error => console.log('Send to error page when it appears')
      );
  }

  remove(index: number, title: string) {
    this.candidateFormService.removeRow(index, title, this.candidateForm);
  }

  additionDiscipline(): void {
    const control = <FormArray>this.candidateForm.controls['disciplineList'];
    control.push(this.candidateFormService.initDisciplineForm());
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
