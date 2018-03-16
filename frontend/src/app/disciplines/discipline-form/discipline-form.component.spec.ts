import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DisciplineFormComponent } from './discipline-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DisciplineControllerService } from '../../api/services';
import { Router, ActivatedRoute } from '@angular/router';
import { UserControllerService } from '../../api/services/user-controller.service';
import { DisciplineService } from '../service/discipline.service';
import { APP_BASE_HREF } from '@angular/common';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { LightFieldService } from '../../shared/validator/service/light-field.service';
import { SharedModule } from '../../shared/shared.module';
import { UserInfo } from '../../domain/UserInfo';
import { Observable } from 'rxjs/Observable';
import { DisciplineWithDisciplineHeadsDTO } from '../../api/models/disciplineWithDisciplineHeadsDTO';

describe('DisciplineFormComponent', () => {
  let component: DisciplineFormComponent;
  let fixture: ComponentFixture<DisciplineFormComponent>;
  const java = new DisciplineWithDisciplineHeadsDTO();
  java.id = 1;
  java.name = 'Java';
  java.subscription = '.';
  java.parentId = null;

  const javaSubItem = new DisciplineWithDisciplineHeadsDTO();
  javaSubItem.parentId = 1;
  javaSubItem.parentName = 'Java';

  const users: UserInfo[] = [
    new UserInfo(22, 'Gary', 'Ortiz', ['DISCIPLINE_HEAD', 'HUMAN_RESOURCE']),
    new UserInfo(27, 'Laura', 'Harper', ['DISCIPLINE_HEAD', 'HUMAN_RESOURCE'])
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule],
      declarations: [DisciplineFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: DisciplineControllerService, useClass: DisciplineControllerServiceStub },
        { provide: UserControllerService, useClass: UserControllerServiceStub },
        { provide: DisciplineService, useClass: DisciplineServiceStub },
        { provide: PopupService, useClass: PopupServiceServiceStub },
        { provide: LightFieldService, useClass: LightFieldServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(DisciplineFormComponent);
    component = fixture.componentInstance;
  }));

  it('should be created', () => {
    fixture = TestBed.createComponent(DisciplineFormComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should get all discipline heads list from service',
    inject([UserControllerService], (userControllerService: UserControllerServiceStub) => {
      spyOn(userControllerService, 'getUsersByRole').and.callThrough();
      fixture.detectChanges();
      expect(userControllerService.getUsersByRole).toHaveBeenCalled();
      expect(userControllerService.getUsersByRole()).toEqual(Observable.of(users));
    })
  );

  it('should edit the existing discipline',
    inject([ActivatedRoute], (route: ActivatedRouteStub) => {
      spyOn(route.snapshot.paramMap, 'get').and
        .callFake((parameterName) => parameterName === 'editDisciplineID' ? 1 : false);
      fixture.detectChanges();
      expect(component.discipline).toEqual(java);
      expect(component.noEdit).toEqual(false);
    })
  );

  it('should view the existing discipline',
    inject([ActivatedRoute], (route: ActivatedRouteStub) => {
      spyOn(route.snapshot.paramMap, 'get').and
        .callFake((parameterName) => parameterName === 'viewDisciplineID' ? 1 : false);
      fixture.detectChanges();
      expect(component.discipline).toEqual(java);
      expect(component.noEdit).toEqual(true);
    })
  );

  it('should create a new discipline',
    inject([ActivatedRoute], (route: ActivatedRouteStub) => {
      spyOn(route.snapshot.paramMap, 'get').and
        .callFake((parameterName) => parameterName === 'parentDisciplineID' ? 1 : false);
      fixture.detectChanges();
      expect(component.discipline).toEqual(javaSubItem);
      expect(component.noEdit).toEqual(false);
    })
  );
});

class DisciplineControllerServiceStub {
  findByIdUsingGET(number: number): Observable<DisciplineWithDisciplineHeadsDTO> {
    const java = new DisciplineWithDisciplineHeadsDTO();
    java.id = 1;
    java.name = 'Java';
    java.subscription = '.';
    java.parentId = null;
    return Observable.of(java);
  }
}

class DisciplineServiceStub {
  readonly createEditOptions = {
    EDIT: 'EDIT',
    CREATE_SUB_ITEM: 'CREATE_SUB_ITEM',
    VIEW: 'VIEW'
  };
}

class RouterStub {
}

class UserControllerServiceStub {
  getUsersByRole(): Observable<UserInfo[]> {
    const users: UserInfo[] = [
      new UserInfo(22, 'Gary', 'Ortiz', ['DISCIPLINE_HEAD', 'HUMAN_RESOURCE']),
      new UserInfo(27, 'Laura', 'Harper', ['DISCIPLINE_HEAD', 'HUMAN_RESOURCE'])
    ];
    return Observable.of(users);
  }
}

class PopupServiceServiceStub {
}

class LightFieldServiceStub {
}

@Injectable()
export class ActivatedRouteStub {
  public snapshot = new Snapshot();
}

class ParamMap {
  get(string: string) {
    return false;
  }
}

class Snapshot {
  public paramMap = new ParamMap();
}
