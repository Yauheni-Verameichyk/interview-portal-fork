import { Component, Output, EventEmitter, Input } from '@angular/core';
import { UserInfo } from '../../domain/UserInfo';
import { UserControllerService } from '../../api/services';
import { userInfo } from 'os';
import { OnDestroy, OnInit, OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.css']
})
export class SelectUserComponent implements OnChanges, OnDestroy {

  @Input() public selectedUsersList: Array<UserInfo> = [null];
  @Input() public usersList: Array<UserInfo>;
  @Output() private addUsers = new EventEmitter<UserInfo[]>();

  private readonly destroy: Subject<void> = new Subject();
  constructor(private userControllerService: UserControllerService) { }

  ngOnChanges(): void {
    if (this.usersList != null && this.usersList.length !== 0) {
      for (let i = 0; i < this.selectedUsersList.length; i++) {
        this.selectedUsersList[i] = this.usersList.filter(user => {
          return (user && this.selectedUsersList[i]) ? user.id === this.selectedUsersList[i].id : false;
        })[0];
      }
    }
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
