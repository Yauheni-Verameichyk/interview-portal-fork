import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineSearchComponent } from './discipline-search.component';

describe('DisciplineSearchComponent', () => {
  let component: DisciplineSearchComponent;
  let fixture: ComponentFixture<DisciplineSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplineSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplineSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
