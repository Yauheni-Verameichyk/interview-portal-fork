import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventTargetLike } from 'rxjs/observable/FromEventObservable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent {
  @Output() private parameters = new EventEmitter<string>();
  isCoordinator = true;
  isDisciplineHead = true;
  isInterviewer = true;
  isHumanResource = true;
  userName = '';
  private keyUp = new Subject<string>();

  searchByParameters(): void {
    if (this.userName.length > 0) {
      const separator = this.isChosen() ? ';' : '';
      const searchString = `name:${this.userName}${separator}${this.concatParameters()}`;
      this.parameters.emit(searchString);
    } else {
      const searchString = `${this.concatParameters()}`;
      this.parameters.emit(searchString);
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
  resetParameters(): void {
    this.isCoordinator = true;
    this.isDisciplineHead = true;
    this.isInterviewer = true;
    this.isHumanResource = true;
    this.userName = '';
    this.searchByParameters();
  }
}
