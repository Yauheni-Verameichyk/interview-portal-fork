import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { DisciplineDTO } from '../../api/models';
import { DisciplineWithDisciplineHeadsDTO } from '../../api/models/disciplineWithDisciplineHeadsDTO';
import { DisciplineControllerService } from '../../api/services';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { SharedModule } from '../../shared/shared.module';
import { DisciplineService } from '../service/discipline.service';
import { DisciplineComponent } from './discipline.component';

describe('DisciplineComponent', () => {
  let component: DisciplineComponent;
  let fixture: ComponentFixture<DisciplineComponent>;
  const java = new DisciplineDTO();
  java.id = 1;
  java.name = 'Java';
  java.subscription = '.';
  java.parentId = null;
  java.hasChildren = false;

  const javaSubItem = new DisciplineDTO();
  javaSubItem.name = 'Java core';
  javaSubItem.subscription = 'Some description';
  javaSubItem.parentId = 1;
  javaSubItem.hasChildren = false;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule],
      declarations: [DisciplineComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: DisciplineControllerService, useClass: DisciplineControllerServiceStub },
        { provide: DisciplineService, useClass: DisciplineServiceStub },
        { provide: PopupService, useClass: PopupServiceServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: AuthenticationService, useClass: AuthenticationServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplineComponent);
    component = fixture.componentInstance;
    component.discipline = java;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should delete the discipline',
    inject([PopupService, DisciplineControllerService],
      (popupService: PopupService, disciplineControllerService: DisciplineControllerService) => {
        spyOn(popupService, 'displayMessage').and.callThrough();
        spyOn(disciplineControllerService, 'deleteDisciplineUsingDELETE').and.callThrough();
        component.deleteDiscipline(component.discipline.id);
        expect(disciplineControllerService.deleteDisciplineUsingDELETE).toHaveBeenCalled();
        expect(popupService.displayMessage).toHaveBeenCalledWith('Discipline was deleted', new RouterStub());
      }),
  );

  it('should fail to delete the discipline',
    inject([PopupService, DisciplineControllerService],
      (popupService: PopupService, disciplineControllerService: DisciplineControllerService) => {
        spyOn(popupService, 'displayMessage').and.callThrough();
        spyOn(disciplineControllerService, 'deleteDisciplineUsingDELETE')
          .and.callFake((parameterName) => Observable.throw(new Error()));
        component.deleteDiscipline(component.discipline.id);
        expect(disciplineControllerService.deleteDisciplineUsingDELETE).toHaveBeenCalled();
        expect(popupService.displayMessage).toHaveBeenCalledWith('Error during discipline deleting', new RouterStub());
      }),
  );
});

class DisciplineControllerServiceStub {
  findSubItemsUsingGET(id: number): Observable<DisciplineDTO[]> {
    const javaSubItem = new DisciplineDTO();
    javaSubItem.name = 'Java core';
    javaSubItem.subscription = 'Some description';
    javaSubItem.parentId = 1;
    javaSubItem.hasChildren = false;
    return Observable.of([javaSubItem]);
  }

  deleteDisciplineUsingDELETE(id: number): Observable<void> {
    return Observable.of(null);
  }
}
class DisciplineServiceStub {
  countBackgroundColor(childLevel): number {
    return 240 - childLevel * 30;
  }

  convertDisciplineName(disciplineName: string): string {
    return 'JAVA';
  }

  generateCreateSubItemPermissionForDiscipline(discipline: DisciplineWithDisciplineHeadsDTO): string {
    return (discipline.parentName) ? `SUB_ITEM_CREATE_${discipline.parentName.toUpperCase()}`
      : `SUB_ITEM_CREATE_${discipline.name.toUpperCase()}`;
  }

  generateEditPermissionForDiscipline(parentName: string): string {
    return (!parentName) ? 'DISCIPLINE_EDIT' : `SUB_ITEM_EDIT_${parentName.toUpperCase()}`;
  }

  generateDeletePermissionForDiscipline(parentName: string): string {
    return (!parentName) ? 'DISCIPLINE_DELETE' : `SUB_ITEM_DELETE_${parentName.toUpperCase()}`;
  }

}

class PopupServiceServiceStub {
  displayMessage(string: string, router: Router) {

  }
}

class RouterStub {
  events = Observable.of(null);
  navigate(commands: any[], extras?: NavigationExtras) { }
}

class AuthenticationServiceStub {
  isPermissionPresent(any) {
    return true;
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

