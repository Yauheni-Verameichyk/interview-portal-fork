import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageWindowComponent } from './message-window.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MessageWindowComponent', () => {
  let component: MessageWindowComponent;
  let fixture: ComponentFixture<MessageWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageWindowComponent ],
      imports: [RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
