import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateComponent } from './candidate.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { CandidateDTO } from '../../api/models/candidate-dto';
import { DisciplineDTO } from '../../api/models';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CandidateControllerService } from '../../api/services/candidate-controller.service';
import { PopupService } from '../../shared/pop-up-window/popup-service/popup.service';
import { Observable } from 'rxjs/Observable';

const candidateControllerServiceStub = {
  deleteUsingDELETE(id: number) {
    return Observable.of(null);
  }
};
const popupServiceStub = {
  displayMessage() {

  }
};
describe('CandidateComponent', () => {
  let component: CandidateComponent;
  let fixture: ComponentFixture<CandidateComponent>;
  let element: HTMLElement;
  let spy;


  const candidate: CandidateDTO = {
    id: 1,
    name: "Viktor",
    surname: "Grinko",
    disciplineList: [
      { id: 1, name: "java" },
      { id: 2, name: "javascript" }
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: CandidateControllerService, useValue: candidateControllerServiceStub },
        { provide: PopupService, useValue: popupServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateComponent);
    component = fixture.componentInstance;
    component.candidate = candidate;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show name', () => {
    expect(element.textContent).toContain(candidate.name);
  });

  it('should display surname', () => {
    candidate.surname = 'Hrynko';
    fixture.detectChanges();
    expect(element.textContent).toContain('Hrynko');
  });

  it('should display discipline list', () => {
    expect(element.textContent).toContain(candidate.disciplineList[0].name);
    expect(element.textContent).toContain(candidate.disciplineList[1].name);
  });

});
