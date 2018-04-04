import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let titleDebugElement: DebugElement;
  let descriptionDebugElement: DebugElement;
  let titleHtmlElement: HTMLElement;
  let descriptionHtmlElement: HTMLElement;

  // first beforeEach - synchronous for module setting
  // load template and compiling
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    titleDebugElement = fixture.debugElement.query(By.css('h1'));
    descriptionDebugElement = fixture.debugElement.query(By.css('h2'));
    titleHtmlElement = titleDebugElement.nativeElement;
    descriptionHtmlElement = descriptionDebugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display original title', () => {
    fixture.detectChanges();
    expect(titleHtmlElement.textContent).toContain(component.errorNumber);
  });
  it('should display a different test title', () => {
    component.errorNumber = '404';
    fixture.detectChanges();
    expect(titleHtmlElement.textContent).toContain('404');
  });
  it('should display original description', () => {
    fixture.detectChanges();
    expect(descriptionHtmlElement.textContent).toContain(component.errorDescription);
  });
  it('should display a different test description', () => {
    component.errorDescription = 'some description';
    fixture.detectChanges();
    expect(descriptionHtmlElement.textContent).toContain('some description');
  });
  it('no title in the DOM element until manually call "detectChanges()"', () => {
    expect(titleHtmlElement.textContent).toEqual('');
  });
  it('no description in the DOM element until manually call "detectChanges()"', () => {
    expect(descriptionHtmlElement.textContent).toEqual('');
  });
});

