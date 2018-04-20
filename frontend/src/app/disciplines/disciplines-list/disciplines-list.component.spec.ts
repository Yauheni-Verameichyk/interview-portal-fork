import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { DisciplinesListComponent } from './disciplines-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { DisciplineService } from '../service/discipline.service';
import { DisciplineDTO } from '../../api/models';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/takeUntil';
import { Observable } from 'rxjs/Observable';
import { DisciplineControllerService } from '../../api/services/discipline-controller.service';
import { Subject } from 'rxjs/Subject';

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

  // const routerStub = {
  //   subject: new Subject<any>(),
  //   events: subject.asObservable(),
  //   navigate(commands: any[]) { },
  //   sendEvent(any) {
  //     this.subject.next(any);
  //   }

  // };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [DisciplinesListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: DisciplineService, useClass: DisciplineServiceStub },
        { provide: PopupService, useClass: PopupServiceServiceStub },
        { provide: AuthenticationService, useClass: AuthenticationServiceStub },
        { provide: Router, useClass: RouterStub },
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(DisciplinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should find disciplines for user', () => {
    expect(component.disciplinesList).toEqual([java]);
  });

  it('should find all disciplines',
    inject([DisciplineService, AuthenticationService],
      (disciplineService: DisciplineService, authenticationService: AuthenticationService) => {
        spyOn(authenticationService, 'isPermissionPresent').and.returnValue(false);
        spyOn(disciplineService, 'chooseRequest').and.returnValue(Observable.of([java, javaScript]));
        fixture = TestBed.createComponent(DisciplinesListComponent);
        component = fixture.componentInstance;
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
        fixture = TestBed.createComponent(DisciplinesListComponent);
        component = fixture.componentInstance;
        expect(component.disciplinesList).toEqual([]);
        fixture.detectChanges();
        expect(disciplineService.chooseRequest).toHaveBeenCalled();
        expect(popupService.displayMessage).toHaveBeenCalled();
      })
  );

  it('should update disciplines list if navigation end event occurred',
    inject([Router], (router: Router) => {
      const spy = spyOn(component, 'findDisciplines').and.callThrough();
      router.initialNavigation();
      expect(spy).toHaveBeenCalled();
    })
  );

  it('should not update disciplines list if navigation end event not occurred',
    inject([Router], (router: Router) => {
      const spy = spyOn(component, 'findDisciplines').and.callThrough();
      router.navigate([]);
      expect(spy).not.toHaveBeenCalled();
    })
  );

  it('should receive disciplines from search form', () => {
    expect(component.disciplinesList).toEqual([java]);
    component.receiveDisciplinesFromSearch([java, javaScript]);
    expect(component.disciplinesList).toEqual([java, javaScript]);
  });

  it('should not load additional disciplines', () => {
    const spy = spyOn(component, 'findDisciplines').and.callThrough();
    component.windowScrollListener();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not load additional disciplines', () => {
    const spy = spyOn(component, 'findDisciplines').and.callThrough();
    spyOnProperty(document.documentElement, 'scrollTop').and.returnValue(100);
    spyOnProperty(document.documentElement, 'scrollHeight').and.returnValue(100);
    spyOnProperty(document.documentElement, 'clientHeight').and.returnValue(0);
    component.activeFilter = 'ALL';
    component.windowScrollListener();
    expect(spy).toHaveBeenCalled();
  });
});

class RouterStub {
  subject = new Subject<any>();
  events = this.subject.asObservable();
  navigate(commands: any[]) {
    this.subject.next(null);
  }
  initialNavigation() {
    this.subject.next(new NavigationEnd(1, 'awe', 'popup:message'));
  }
}
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
