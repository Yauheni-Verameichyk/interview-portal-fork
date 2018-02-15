import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinePageComponent } from './discipline-page.component';

describe('DisciplinePageComponent', () => {
  let component: DisciplinePageComponent;
  let fixture: ComponentFixture<DisciplinePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplinePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
