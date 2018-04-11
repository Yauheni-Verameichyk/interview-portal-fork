import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRoleComponent } from './select-role.component';
import { UserFormMangerService } from './service/user-form-manger.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/of';
import { DisciplineDTO } from '../../api/models';

describe('SelectRoleComponent', () => {
  let component: SelectRoleComponent;
  let fixture: ComponentFixture<SelectRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectRoleComponent],
      providers: [
        { provide: UserFormMangerService, useClass: UserFormMangerServiceStub }

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRoleComponent);
    component = fixture.componentInstance;
    component.roles = {Discipline: [new DisciplineDTO]};
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
