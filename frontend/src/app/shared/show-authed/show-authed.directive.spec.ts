import { ShowAuthedDirective } from './show-authed.directive';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { By } from '@angular/platform-browser';

let fixture: ComponentFixture<TestShowAuthedComponent>;
let component;

describe('ShowAuthedDirective', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAuthedDirective, TestShowAuthedComponent],
      schemas: [],
      providers: [
        { provide: AuthenticationService, useClass: AuthenticationServiceStub },
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(TestShowAuthedComponent);
    component = fixture.componentInstance;
  }));

  it('should create a test component with directive', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should show a required HTML element', () => {
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input).toBeTruthy();
  });
  it('should hide a required HTML element', () => {
    component.requiredPermission = '123';
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    expect(input).toBeFalsy();
  });
});

@Component({
  template: `<input id="input" type="text" *requiredAuthority="requiredPermission">`
})
class TestShowAuthedComponent {
  public requiredPermission = 'SUB_ITEM_CREATE';
}

class AuthenticationServiceStub {
  isPermissionPresent(permission: string): boolean {
    return permission === 'SUB_ITEM_CREATE';
  }
}
