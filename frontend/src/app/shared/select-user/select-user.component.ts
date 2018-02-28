import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserInfo } from '../../domain/UserInfo';
import { UserControllerService } from '../../api/services';
import { userInfo } from 'os';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.css']
})
export class SelectUserComponent implements OnInit, OnDestroy {

  selectedUsersList: Array<UserInfo> = [null];
  usersList: Array<UserInfo> = [];

  @Output() addUsers = new EventEmitter<UserInfo[]>();

  private readonly destroy: Subject<void> = new Subject();
  constructor(private userControllerService: UserControllerService) { }

  ngOnInit() {
    this.userControllerService.getUsersByRole('DISCIPLINE_HEAD')
      .takeUntil(this.destroy)
      .subscribe(
        (usersList) => {
          this.usersList = usersList;
        }, error => {
          console.error('Error happened');
        });
  }

  userChanged(): void {
    this.addUsers.emit(this.selectedUsersList);
  }

  addDHForm(): void {
    this.selectedUsersList.push(null);
  }

  deleteDHForm(formNumber: number): void {
    this.selectedUsersList.splice(formNumber, 1);
    this.userChanged();
    if (this.selectedUsersList.length === 0) {
      this.addDHForm();
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
