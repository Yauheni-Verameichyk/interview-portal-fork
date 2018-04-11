import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDisciplineComponent } from './assign-discipline.component';
import { UserFormMangerService } from '../select-role/service/user-form-manger.service';
import { DisciplineControllerService } from '../../api/services';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { DisciplineDTO } from '../../api/models';

const disciplineControllerServiceStub = {
    findAllUsingGET(){
      return Observable.of(null);
    }
};
describe('AssignDisciplineComponent', () => {
  let component: AssignDisciplineComponent;
  let fixture: ComponentFixture<AssignDisciplineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignDisciplineComponent ],
      providers: [
        {provide: UserFormMangerService, useClass: UserFormMangerServiceStub},
        {provide: DisciplineControllerService, useValue: disciplineControllerServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDisciplineComponent);
    component = fixture.componentInstance;
    component.assignDiscipline = {Coordinator: [new DisciplineDTO]};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class UserFormMangerServiceStub {
  showButtonEmitter = Observable.of(true);
  formatString(role: string): string {
    return role;
  }
}
