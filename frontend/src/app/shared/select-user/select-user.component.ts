import { Component, Output, EventEmitter, Input } from '@angular/core';
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
export class SelectUserComponent implements OnDestroy {

  @Input() public selectedUsersList: Array<UserInfo> = [null];
  @Input() public usersList: Array<UserInfo> = [];
  @Output() private addUsers = new EventEmitter<UserInfo[]>();

  private readonly destroy: Subject<void> = new Subject();
  constructor(private userControllerService: UserControllerService) { }

  userChanged(): void {
    this.addUsers.emit(this.selectedUsersList);
  }

  addDHForm(): void {
    console.log(this.selectedUsersList);
    console.log(this.usersList);
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
