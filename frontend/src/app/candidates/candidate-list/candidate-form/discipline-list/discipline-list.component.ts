import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { CandidateService } from '../../../service/candidate.service';
import { Discipline } from '../../../../api/models';
import { Subject } from 'rxjs';
import { DisciplineControllerService } from '../../../../api/services';

@Component({
  selector: 'app-discipline-list',
  templateUrl: './discipline-list.component.html',
  styleUrls: ['./discipline-list.component.css']
})
export class DisciplineListComponent implements OnInit, OnDestroy {

  @Input() candidateForm: FormGroup;
  public disciplines: Discipline[];
  private readonly destroy: Subject<void> = new Subject();

  constructor(private formBuilder: FormBuilder,
    private candidateService: CandidateService,
    private disciplinesService: DisciplineControllerService) { }

  ngOnInit(): void {
    this.fetchDisciplines();
  }

  fetchDisciplines(): any {
    this.disciplinesService.findAllUsingGET()
      .takeUntil(this.destroy)
      .subscribe((disciplines) => {
        this.disciplines = disciplines;
      }, error => console.log('Send to error page when it appears')
      );
  }

  remove(index: number, title: string) {
    this.candidateService.removeRow(index, title, this.candidateForm);
  }

  additionDiscipline(): void {
    const control = <FormArray>this.candidateForm.controls['disciplineList'];
    control.push(this.candidateService.initDisciplineForm());
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
