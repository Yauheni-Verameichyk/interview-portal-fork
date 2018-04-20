import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { UserInfo } from '../../domain/UserInfo';
import { UserControllerService } from '../../api/rest/service/user-controller.service';



@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit, OnDestroy {
  @Output() private emitUsers = new EventEmitter<UserInfo[]>();
  private readonly destroy: Subject<void> = new Subject();
  isCoordinator = true;
  isDisciplineHead = true;
  isInterviewer = true;
  isHumanResource = true;

  constructor(private userController: UserControllerService) { }

  ngOnInit() {
  }

  searchByParameters(userName: string): void {
    if (userName.length > 0) {
      const separator = this.isChosen() ? ';' : '';
      const searchString = `name:${userName}${separator}${this.concatParameters()}`;
      this.findUsersByParameters(searchString);
    } else {
      const searchString = `${this.concatParameters()}`;
      this.findUsersByParameters(searchString);
      console.log(searchString);
    }

  }
  concatParameters() {
    if (this.isChosen()) {
      const roles = new Array;
      if (this.isCoordinator) {
        roles.push('COORDINATOR');
      }
      if (this.isDisciplineHead) {
        roles.push('DISCIPLINE_HEAD');
      }
      if (this.isInterviewer) {
        roles.push('INTERVIEWER');
      }
      if (this.isHumanResource) {
        roles.push('HUMAN_RESOURCE');
      }
      return `userRoleDisciplines#${roles}`;
    } else {
      return '';
    }
  }
  isChosen(): boolean {
    return (this.isCoordinator
      || this.isDisciplineHead
      || this.isHumanResource
      || this.isInterviewer) ? true : false;
  }
  findUsersByParameters(parameters: string) {
    this.userController.getUsersByParameters(parameters)
      .takeUntil(this.destroy)
      .subscribe(users => {
        this.emitUsers.emit(users);
      }, error => {
       console.log('Users not found');
      }
      );
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
