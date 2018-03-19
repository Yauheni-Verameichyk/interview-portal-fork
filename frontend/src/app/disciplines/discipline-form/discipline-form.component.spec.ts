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
import 'rxjs/add/observable/throw';
import { DisciplineWithDisciplineHeadsDTO } from '../../api/models/disciplineWithDisciplineHeadsDTO';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('DisciplineFormComponent', () => {
  let component: DisciplineFormComponent;
  let fixture: ComponentFixture<DisciplineFormComponent>;
  const java = new DisciplineWithDisciplineHeadsDTO();
  java.id = 1;
  java.name = 'Java';
  java.subscription = '.';
  java.parentId = null;

  const javaSubItem = new DisciplineWithDisciplineHeadsDTO();
  javaSubItem.name = undefined;
  javaSubItem.subscription = undefined;
  javaSubItem.parentId = 1;
  javaSubItem.parentName = 'Java';

  const users: UserInfo[] = [
    new UserInfo(22, 'Gary', 'Ortiz', ['DISCIPLINE_HEAD', 'HUMAN_RESOURCE']),
    new UserInfo(27, 'Laura', 'Harper', ['DISCIPLINE_HEAD', 'HUMAN_RESOURCE'])
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule, SharedModule],
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

  it('should throw error with unspecified operation', () => {
    fixture.detectChanges();
    expect(function () { component.initializeDiscipline('1', new DisciplineWithDisciplineHeadsDTO()); }
    ).toThrowError('Perhaps you do not know what you want');
  });

  it('should fail to read discipline',
    inject([ActivatedRoute, DisciplineControllerService],
      (route: ActivatedRouteStub, disciplineControllerService: DisciplineControllerService) => {
        spyOn(route.snapshot.paramMap, 'get').and
          .callFake((parameterName) => parameterName === 'viewDisciplineID' ? 1 : false);
        spyOn(disciplineControllerService, 'findByIdUsingGET').and
          .callFake((parameterName) => Observable.throw(new Error()));
        fixture.detectChanges();
        expect(disciplineControllerService.findByIdUsingGET).toHaveBeenCalled();
      })
  );

  it('should create a new sub item',
    inject([ActivatedRoute], (route: ActivatedRouteStub) => {
      spyOn(route.snapshot.paramMap, 'get').and
        .callFake((parameterName) => parameterName === 'parentDisciplineID' ? 1 : false);
      fixture.detectChanges();
      expect(component.discipline).toEqual(javaSubItem);
      expect(component.noEdit).toEqual(false);
    })
  );

  it('should create a new discipline', () => {
    fixture.detectChanges();
    const expected = new DisciplineWithDisciplineHeadsDTO();
    expected.name = undefined;
    expected.subscription = undefined;
    expect(component.discipline).toEqual(expected);
    expect(component.noEdit).toEqual(false);
  });

  it('form invalid when empty', () => {
    fixture.detectChanges();
    expect(component.disciplineForm.valid).toBeFalsy();
  });

  it('discipline name field validity if field is too short', () => {
    fixture.detectChanges();
    const disciplineName = component.disciplineForm.controls['disciplineName'];
    disciplineName.setValue('w');
    expect(disciplineName.valid).toBeFalsy();
  });

  it('discipline name field validity when field is empty', () => {
    fixture.detectChanges();
    const disciplineName = component.disciplineForm.controls['disciplineName'];
    expect(disciplineName.valid).toBeFalsy();
  });

  it('discipline name field validity when field is valid', () => {
    fixture.detectChanges();
    const disciplineName = component.disciplineForm.controls['disciplineName'];
    disciplineName.setValue('qsasasw');
    expect(disciplineName.valid).toBeTruthy();
  });

  it('should replace existing disciplineHeadsList with new one ', () => {
    fixture.detectChanges();
    component.discipline = java;
    const actualList = [new UserInfo(22, 'Gary', 'Ortiz', ['DISCIPLINE_HEAD', 'HUMAN_RESOURCE'])];
    const expectedList = [
      new UserInfo(22, 'Gary', 'Ortiz', ['DISCIPLINE_HEAD', 'HUMAN_RESOURCE']),
      new UserInfo(27, 'Laura', 'Harper', ['DISCIPLINE_HEAD', 'HUMAN_RESOURCE'])
    ];
    component.discipline.disciplineHeadsList = actualList;
    expect(component.discipline.disciplineHeadsList).toEqual(actualList);
    component.addUsers(expectedList);
    expect(component.discipline.disciplineHeadsList).toEqual(expectedList);
  });

  it('should save discipline',
    inject([DisciplineControllerService, PopupService],
      (disciplineControllerService: DisciplineControllerService, popupService: PopupService) => {
        spyOn(disciplineControllerService, 'saveUsingPOST').and.callThrough();
        spyOn(popupService, 'displayMessage').and.callThrough();
        component.discipline = java;
        fixture.detectChanges();
        component.sendDiscipline();
        expect(disciplineControllerService.saveUsingPOST).toHaveBeenCalled();
        expect(popupService.displayMessage).toHaveBeenCalledWith('Discipline was saved', new RouterStub());
      })
  );

  it('should fail to save discipline',
    inject([DisciplineControllerService, PopupService],
      (disciplineControllerService: DisciplineControllerService, popupService: PopupService) => {
        spyOn(disciplineControllerService, 'saveUsingPOST').and
          .callFake((parameterName) => Observable.throw(new Error()));
        spyOn(popupService, 'displayMessage').and.callThrough();
        component.discipline = java;
        fixture.detectChanges();
        component.sendDiscipline();
        expect(disciplineControllerService.saveUsingPOST).toHaveBeenCalled();
        expect(popupService.displayMessage).toHaveBeenCalledWith('Error during discipline saving', new RouterStub());
      })
  );

  it('should not save the discipline with invalid field',
    inject([LightFieldService], (lightFieldService: LightFieldServiceStub) => {
      spyOn(lightFieldService, 'lightField').and.callThrough();
      fixture.detectChanges();
      component.discipline = java;
      component.discipline.name = 'w';
      component.sendDiscipline();
      expect(lightFieldService.lightField).toHaveBeenCalled();
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

  saveUsingPOST(discipline: DisciplineWithDisciplineHeadsDTO): Observable<void> {
    return Observable.of(null);
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
  displayMessage(string: string, router: Router) {

  }
}

class LightFieldServiceStub {
  lightField(any) {

  }
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
