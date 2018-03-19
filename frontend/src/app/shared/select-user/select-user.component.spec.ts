import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUserComponent } from './select-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserInfo } from '../../domain/UserInfo';

describe('SelectUserComponent', () => {
  let component: SelectUserComponent;
  let fixture: ComponentFixture<SelectUserComponent>;
  const users: UserInfo[] = [
    new UserInfo(22, 'Gary', 'Ortiz', ['DISCIPLINE_HEAD', 'HUMAN_RESOURCE']),
    new UserInfo(27, 'Laura', 'Harper', ['DISCIPLINE_HEAD', 'HUMAN_RESOURCE'])
  ];

  const usersWithNullInTheMiddle = [
    new UserInfo(22, 'Gary', 'Ortiz', ['DISCIPLINE_HEAD', 'HUMAN_RESOURCE']), null,
    new UserInfo(27, 'Laura', 'Harper', ['DISCIPLINE_HEAD', 'HUMAN_RESOURCE'])
  ];

  const usersWithNullInTheEnd = [
    new UserInfo(22, 'Gary', 'Ortiz', ['DISCIPLINE_HEAD', 'HUMAN_RESOURCE']),
    new UserInfo(27, 'Laura', 'Harper', ['DISCIPLINE_HEAD', 'HUMAN_RESOURCE',]), null
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [SelectUserComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(SelectUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should remove null from the middle of the users list', () => {
    component.selectedUsersList = usersWithNullInTheMiddle;
    component.usersList = usersWithNullInTheMiddle;
    component.ngOnChanges();
    expect(component.selectedUsersList).toEqual(users);
  });

  it('should not give any change options if users list is empty', () => {
    component.selectedUsersList = usersWithNullInTheMiddle;
    component.usersList = [];
    component.ngOnChanges();
    expect(component.selectedUsersList).toEqual(usersWithNullInTheMiddle);
  });

  it('should add user form and null to the selectedUsersList', () => {
    const actualUsersList = [
      new UserInfo(22, 'Gary', 'Ortiz', ['DISCIPLINE_HEAD', 'HUMAN_RESOURCE']),
      new UserInfo(27, 'Laura', 'Harper', ['DISCIPLINE_HEAD', 'HUMAN_RESOURCE'])
    ];
    component.selectedUsersList = actualUsersList
    component.usersList = actualUsersList;
    component.addDHForm();
    expect(component.selectedUsersList).toEqual(usersWithNullInTheEnd);
  });

  it('should remove user form and user from the selectedUsersList', () => {
    const actualUsersList = [
      new UserInfo(22, 'Gary', 'Ortiz', ['DISCIPLINE_HEAD', 'HUMAN_RESOURCE']),
      new UserInfo(27, 'Laura', 'Harper', ['DISCIPLINE_HEAD', 'HUMAN_RESOURCE'])
    ];
    component.selectedUsersList = actualUsersList;
    component.usersList = actualUsersList;
    component.deleteDHForm(0);
    expect(component.selectedUsersList).toEqual([new UserInfo(27, 'Laura', 'Harper', ['DISCIPLINE_HEAD', 'HUMAN_RESOURCE',])]);
  });

  it('should remove all user forms and users from the selectedUsersList and left single null', () => {
    const actualUsersList = [
      new UserInfo(22, 'Gary', 'Ortiz', ['DISCIPLINE_HEAD', 'HUMAN_RESOURCE']),
      new UserInfo(27, 'Laura', 'Harper', ['DISCIPLINE_HEAD', 'HUMAN_RESOURCE'])
    ];
    component.selectedUsersList = actualUsersList;
    component.usersList = actualUsersList;
    component.deleteDHForm(0);
    component.deleteDHForm(0);
    expect(component.selectedUsersList).toEqual([null]);
  });
});
