import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { DisciplinesListComponent } from './disciplines-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { DisciplineService } from '../service/discipline.service';
import { DisciplineDTO } from '../../api/models';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

describe('DisciplinesListComponent', () => {
  let component: DisciplinesListComponent;
  let fixture: ComponentFixture<DisciplinesListComponent>;

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
      imports: [RouterTestingModule, SharedModule],
      declarations: [DisciplinesListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: DisciplineService, useClass: DisciplineServiceStub },
        { provide: PopupService, useClass: PopupServiceServiceStub },
        { provide: AuthenticationService, useClass: AuthenticationServiceStub },
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(DisciplinesListComponent);
    component = fixture.componentInstance;
  }));

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should find disciplines for user', () => {
    fixture.detectChanges();
    expect(component.disciplinesList).toEqual([java]);
  });

  it('should find all disciplines',
    inject([DisciplineService, AuthenticationService],
      (disciplineService: DisciplineService, authenticationService: AuthenticationService) => {
        spyOn(authenticationService, 'isPermissionPresent').and
        .returnValue(false);
        spyOn(disciplineService, 'chooseRequest').and
          .returnValue(Observable.of([java, javaScript]));
        expect(component.disciplinesList).toEqual([]);
        fixture.detectChanges();
        expect(component.disciplinesList).toEqual([java, javaScript]);
      })
  );

  it('should fail to find disciplines',
    inject([PopupService, DisciplineService],
      (popupService: PopupService, disciplineService: DisciplineService) => {
        spyOn(popupService, 'displayMessage').and.callThrough();
        spyOn(disciplineService, 'chooseRequest')
          .and.callFake((parameterName) => Observable.throw(new Error()));
        expect(component.disciplinesList).toEqual([]);
        fixture.detectChanges();
        expect(disciplineService.chooseRequest).toHaveBeenCalled();
        expect(popupService.displayMessage).toHaveBeenCalled();
      })
  );
});

class DisciplineServiceStub {
  chooseRequest(searchOption: string): Observable<DisciplineDTO[]> {
    const java = new DisciplineDTO();
    java.id = 1;
    java.name = 'Java';
    java.subscription = '.';
    java.parentId = null;
    java.hasSubItems = false;
    return Observable.of([java]);
  }
}

class PopupServiceServiceStub {
  displayMessage(string: string, router: Router) { }
}

class AuthenticationServiceStub {
  isPermissionPresent(any) {
    return true;
  }
}
