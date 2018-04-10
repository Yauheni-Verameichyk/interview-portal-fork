import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { DisciplineComponent } from './discipline.component';
import { NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { DisciplineControllerService } from '../../api/services';
import { DisciplineService } from '../service/discipline.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { DisciplineDTO } from '../../api/models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

describe('DisciplineComponent', () => {
  let component: DisciplineComponent;
  let fixture: ComponentFixture<DisciplineComponent>;
  const java = new DisciplineDTO();
  java.id = 1;
  java.name = 'Java';
  java.subscription = '.';
  java.parentId = null;
  java.hasSubItems = false;

  const javaSubItem = new DisciplineDTO();
  javaSubItem.name = 'Java core';
  javaSubItem.subscription = 'Some description';
  javaSubItem.parentId = 1;
  javaSubItem.hasSubItems = false;

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

  it('should find and show sub items for the discipline', () => {
    expect(component.subDisciplinesList).toEqual([]);
    component.showSubItems();
    expect(component.subDisciplinesList).toEqual([javaSubItem]);
  });

  it('should fail to find and show sub items for the discipline',
    inject([PopupService, DisciplineControllerService],
      (popupService: PopupService, disciplineControllerService: DisciplineControllerService) => {
        spyOn(popupService, 'displayMessage').and.callThrough();
        spyOn(disciplineControllerService, 'findSubItemsUsingGET')
          .and.callFake((parameterName) => Observable.throw(new Error()));
        expect(component.subDisciplinesList).toEqual([]);
        component.showSubItems();
        expect(disciplineControllerService.findSubItemsUsingGET).toHaveBeenCalled();
        expect(popupService.displayMessage).toHaveBeenCalledWith('Error during sub items reading', new RouterStub());
      })
  );

  it('should hide sub items for the discipline', () => {
    component.subDisciplinesList = [javaSubItem];
    component.subItemsShown = true;
    component.showSubItems();
    expect(component.subDisciplinesList).toEqual([]);
  });

  it('should delete the discipline',
    inject([PopupService, DisciplineControllerService],
      (popupService: PopupService, disciplineControllerService: DisciplineControllerService) => {
        spyOn(popupService, 'displayMessage').and.callThrough();
        spyOn(disciplineControllerService, 'deleteDisciplineUsingDELETE').and.callThrough();
        component.deleteDiscipline(component.discipline.id);
        expect(disciplineControllerService.deleteDisciplineUsingDELETE).toHaveBeenCalled();
        expect(popupService.displayMessage).toHaveBeenCalledWith('Discipline was deleted', new RouterStub());
      })
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
      })
  );
});

class DisciplineControllerServiceStub {
  findSubItemsUsingGET(id: number): Observable<DisciplineDTO[]> {
    const javaSubItem = new DisciplineDTO();
    javaSubItem.name = 'Java core';
    javaSubItem.subscription = 'Some description';
    javaSubItem.parentId = 1;
    javaSubItem.hasSubItems = false;
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

  generateEditPermissionForDiscipline(disciplineName: string, childLevel: number): string {
    return (childLevel === 0) ? 'DISCIPLINE_EDIT' : `SUB_ITEM_EDIT_${disciplineName}`;
  }

  generateDeletePermissionForDiscipline(disciplineName: string, childLevel: number): string {
    return (childLevel === 0) ? 'DISCIPLINE_DELETE' : `SUB_ITEM_DELETE_${disciplineName}`;
  }
}

class PopupServiceServiceStub {
  displayMessage(string: string, router: Router) {

  }
}

class RouterStub {
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

