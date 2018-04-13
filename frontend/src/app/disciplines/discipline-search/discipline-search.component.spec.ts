import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineSearchComponent } from './discipline-search.component';
import { Router } from '@angular/router';
import { DisciplineControllerService } from '../../api/services/discipline-controller.service';
import { DisciplineService } from '../service/discipline.service';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';

describe('DisciplineSearchComponent', () => {
  let component: DisciplineSearchComponent;
  let fixture: ComponentFixture<DisciplineSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplineSearchComponent ],
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
});


class DisciplineControllerServiceStub {

}
class DisciplineServiceStub {
}

class PopupServiceStub {
  displayMessage(string: string, router: Router) {  }
}

class RouterStub {
  navigate(commands: any[]) { }
}
