import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { UserPageComponent } from './user-page.component';
import { UserControllerService } from '../../api/services';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { UserDTO } from '../../api/models';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

const user = {
  roleDisciplines: {
    'DISCIPLINE_HEAD': null
  }
};

describe('UserPageComponent', () => {
  let component: UserPageComponent;
  let fixture: ComponentFixture<UserPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [UserPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: UserControllerService, useClass: UserControllerServiceStub },
        { provide: Router, useClass: RouterStub }
      ]
    })
      .compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should read and format disciplines', () => {
    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.getRoles(user)).toEqual([' Discipline head']);
  });
  it('should read and set users list', () => {
    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.userList).toEqual([user]);
  });
  it('should fail during users reading', () => {
    TestBed.overrideComponent(
      UserPageComponent,
      { set: { providers: [{ provide: UserControllerService, useClass: UserControllerServiceStub }] } }
    );
    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inject([Router], (router: RouterStub) => {
      spyOn(router, 'navigate');
      expect(router.navigate).toHaveBeenCalled();
    });
  });
});
  class UserControllerServiceStub {
    findAllUsingGET_1(): Observable<any> {
      return Observable.of([user]);
    }
  }

  class FailUserControllerServiceStub {
    findAllUsingGET_1(): Observable<any> {
      throw new Error();
    }
  }

  class RouterStub {
    public navigate(any): void {

    }
  }
