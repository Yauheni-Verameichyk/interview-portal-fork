import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineListComponent } from './discipline-list.component';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { DisciplineControllerService } from '../../../api/services';
import { CandidateFormService } from '../service/candidate-form.service';
import 'rxjs/add/operator/takeUntil';
import { Observable } from 'rxjs/Observable';
const disciplineControllerServiceStub = {
  findAllUsingGET() { return Observable.of(null); }
};
const candidateFormServiceStub = {};
xdescribe('DisciplineListComponent', () => {
  let component: DisciplineListComponent;
  let fixture: ComponentFixture<DisciplineListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DisciplineListComponent],
      imports: [ReactiveFormsModule, FormsModule, SharedModule],
      providers: [
        { provide: DisciplineControllerService, useValue: disciplineControllerServiceStub },
        { provide: CandidateFormService, useValue: candidateFormServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplineListComponent);
    component = fixture.componentInstance;
    component.candidateForm = new FormGroup({
        disciplineList: new FormControl('')
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
