import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { DisciplineDTO } from '../../api/models/discipline';
import { DisciplineControllerService } from '../../api/services/discipline-controller.service';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { DisciplineService } from '../service/discipline.service';
import { DisciplineSearchComponent } from './discipline-search.component';

describe('DisciplineSearchComponent', () => {
  let component: DisciplineSearchComponent;
  let fixture: ComponentFixture<DisciplineSearchComponent>;

  const java = new DisciplineDTO();
  java.id = 1;
  java.name = 'Java';
  java.subscription = '.';
  java.parentId = null;
  java.hasChildren = false;

  const javaScript = new DisciplineDTO();
  javaScript.id = 2;
  javaScript.name = 'Java Script';
  javaScript.subscription = '23123';
  javaScript.parentId = null;
  javaScript.hasChildren = false;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DisciplineSearchComponent],
      providers: [
        { provide: DisciplineControllerService, useClass: DisciplineControllerServiceStub },
        { provide: DisciplineService, useClass: DisciplineServiceStub },
        { provide: PopupService, useClass: PopupServiceStub },
        { provide: Router, useClass: RouterStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplineSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should not search disciplines by name', inject([DisciplineControllerService],
    (disciplineControllerService: DisciplineControllerService) => {
      spyOn(disciplineControllerService, 'findDisciplinesWithParametersUsingGET').and.callThrough();
      component.searchSubItems = false;
      component.searchDisciplines = false;
      component.searchByName('name');
      expect(disciplineControllerService.findDisciplinesWithParametersUsingGET).not.toHaveBeenCalled();
    }));

  it('should search disciplines by name', inject([DisciplineControllerService],
    (disciplineControllerService: DisciplineControllerService) => {
      fakeAsync(() => {
        spyOn(disciplineControllerService, 'findDisciplinesWithParametersUsingGET').and.callThrough();
        component.searchByName('name');
        tick(500);
        expect(disciplineControllerService.findDisciplinesWithParametersUsingGET).toHaveBeenCalled();
      });
    }));

  it('should fail during disciplines search', inject([DisciplineControllerService, PopupService],
    (disciplineControllerService: DisciplineControllerService, popupService: PopupService) => {
      fakeAsync(() => {
        spyOn(disciplineControllerService, 'findDisciplinesWithParametersUsingGET')
          .and.callFake((parameterName) => Observable.throw(new Error()));
        spyOn(popupService, 'displayMessage').and.callThrough();
        component.searchByName('name');
        tick(500);
        expect(popupService.displayMessage).toHaveBeenCalledWith('Error during disciplines reading', new RouterStub());
      });
    }));
});

class DisciplineControllerServiceStub {
  findDisciplinesWithParametersUsingGET(any) {
    const java = new DisciplineDTO();
    java.id = 1;
    java.name = 'Java';
    java.subscription = '.';
    java.parentId = null;
    java.hasChildren = false;

    const javaScript = new DisciplineDTO();
    javaScript.id = 2;
    javaScript.name = 'Java Script';
    javaScript.subscription = '23123';
    javaScript.parentId = null;
    javaScript.hasChildren = false;
    return Observable.of([java, javaScript]);
  }
}
class DisciplineServiceStub {
  selectSearchPattern(any) {
    return '123';
  }
}

class PopupServiceStub {
  displayMessage(string: string, router: Router) { }
}

class RouterStub {
  navigate(commands: any[]) { }
}
