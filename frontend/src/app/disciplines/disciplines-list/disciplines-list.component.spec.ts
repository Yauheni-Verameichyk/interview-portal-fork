import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/takeUntil';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { DisciplineDTO } from '../../api/models';
import { DisciplineWithDisciplineHeadsDTO } from '../../api/models/disciplineWithDisciplineHeadsDTO';
import { DisciplineControllerService } from '../../api/services/discipline-controller.service';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { SharedModule } from '../../shared/shared.module';
import { DisciplineService } from '../service/discipline.service';
import { DisciplinesListComponent } from './disciplines-list.component';

describe('DisciplinesListComponent', () => {
  let component: DisciplinesListComponent;
  let fixture: ComponentFixture<DisciplinesListComponent>;

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
      imports: [SharedModule],
      declarations: [DisciplinesListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: DisciplineService, useClass: DisciplineServiceStub },
        { provide: PopupService, useClass: PopupServiceServiceStub },
        { provide: AuthenticationService, useClass: AuthenticationServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: DisciplineControllerService, useClass: DisciplineControllerServiceStub },
      ],
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
      }),
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
      }),
  );

  it('should update disciplines list if navigation end event occurred',
    inject([Router], (router: Router) => {
      const spy = spyOn(component, 'findDisciplines').and.callThrough();
      router.initialNavigation();
      expect(spy).toHaveBeenCalled();
    }),
  );

  it('should not update disciplines list if navigation end event not occurred',
    inject([Router], (router: Router) => {
      const spy = spyOn(component, 'findDisciplines').and.callThrough();
      router.navigate([]);
      expect(spy).not.toHaveBeenCalled();
    }),
  );

  it('should receive disciplines from search form', () => {
    expect(component.disciplinesList).toEqual([java]);
    component.receiveDisciplinesFromSearch([java, javaScript]);
    expect(component.disciplinesList).toEqual([java, javaScript]);
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
    java.hasChildren = false;
    return Observable.of([java]);
  }
}

class DisciplineControllerServiceStub {
  findByIdUsingGET(searchOption): Observable<DisciplineWithDisciplineHeadsDTO> {
    const java = new DisciplineDTO();
    java.id = 1;
    java.name = 'Java';
    java.subscription = '.';
    java.parentId = null;
    java.hasChildren = false;
    return Observable.of(java);
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
