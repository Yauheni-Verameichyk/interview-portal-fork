import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { DisciplineSearchComponent } from './discipline-search.component';
import { Router } from '@angular/router';
import { DisciplineControllerService } from '../../api/services/discipline-controller.service';
import { DisciplineService } from '../service/discipline.service';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { Observable } from 'rxjs/Observable';
import { DisciplineDTO } from '../../api/models/discipline';

describe('DisciplineSearchComponent', () => {
  let component: DisciplineSearchComponent;
  let fixture: ComponentFixture<DisciplineSearchComponent>;

  const java = new DisciplineDTO();
  java.id = 1;
  java.name = 'Java';
  java.subscription = '.';
  java.parentId = null;
  java.hasSubItems = false;

  const javaScript = new DisciplineDTO();
  javaScript.id = 2;
  javaScript.name = 'Java Script';
  javaScript.subscription = '23123';
  javaScript.parentId = null;
  javaScript.hasSubItems = false;

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
      spyOn(disciplineControllerService, 'findDisciplinesWithParametersUsingGET').and.callThrough();
      component.searchByName('name');
      expect(disciplineControllerService.findDisciplinesWithParametersUsingGET).toHaveBeenCalled();
      expect(component.disciplinesList).toEqual([java, javaScript]);
    }));

  it('should fail during disciplines search', inject([DisciplineControllerService, PopupService],
    (disciplineControllerService: DisciplineControllerService, popupService: PopupService) => {
      spyOn(disciplineControllerService, 'findDisciplinesWithParametersUsingGET')
        .and.callFake((parameterName) => Observable.throw(new Error()));
      spyOn(popupService, 'displayMessage').and.callThrough();
      component.searchByName('name');
      expect(popupService.displayMessage).toHaveBeenCalledWith('Error during disciplines reading', new RouterStub());
    }));
});


class DisciplineControllerServiceStub {
  findDisciplinesWithParametersUsingGET(any) {
    const java = new DisciplineDTO();
    java.id = 1;
    java.name = 'Java';
    java.subscription = '.';
    java.parentId = null;
    java.hasSubItems = false;

    const javaScript = new DisciplineDTO();
    javaScript.id = 2;
    javaScript.name = 'Java Script';
    javaScript.subscription = '23123';
    javaScript.parentId = null;
    javaScript.hasSubItems = false;
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
