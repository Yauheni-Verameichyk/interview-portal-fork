import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateComponent } from './candidate.component';
import { CandidateService } from '../service/candidate.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { CandidateDTO } from '../../api/models/candidate-dto';
import { DisciplineDTO } from '../../api/models';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CandidateComponent', () => {
  let component: CandidateComponent;
  let fixture: ComponentFixture<CandidateComponent>;
  let element: HTMLElement;
  let spy;
  let mockCandidateService = {
    removeCandidate(id: number) { }
  }

  const candidate: CandidateDTO = {
    id: 1,
    name: "Viktor",
    surname: "Grinko",
    disciplineList: [
      { id: 1, name: "java" },
      { id: 2, name: "javascript" }
    ]
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateComponent],
      providers: [
        { provide: CandidateService, useValue: mockCandidateService }
      ],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateComponent);
    component = fixture.componentInstance;
    component.candidate = candidate;
    element = fixture.nativeElement;
    mockCandidateService = fixture.debugElement.injector.get(CandidateService);
    spy = spyOn(mockCandidateService, 'removeCandidate').and.returnValue(true);
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

  it('should call candidate remove method', () => {
    component.removeCandidate(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

});
