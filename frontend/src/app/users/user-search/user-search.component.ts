import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventTargetLike } from 'rxjs/observable/FromEventObservable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  @Input() set singleRole(role: string) {
    this.isCoordinator = role.includes('COORDINATOR');
    this.isDisciplineHead = role.includes('DISCIPLINE_HEAD');
    this.isInterviewer = role.includes('INTERVIEWER');
    this.isHumanResource = role.includes('HUMAN_RESOURCE');
  }
  @Output() private parameters = new EventEmitter<string>();
  private expectationTime = new Subject();
  isCoordinator = true;
  isDisciplineHead = true;
  isInterviewer = true;
  isHumanResource = true;
  userName = '';
  private keyUp = new Subject<string>();

  ngOnInit(): void {
    // you listen to values here which are debounced
    // on every value, you call the outer component
    this.expectationTime.debounceTime(350).subscribe((value => this.parameters.emit(value.toString())));
  }

  searchByParameters(): void {
    if (this.userName.length > 0) {
      const separator = this.isChosen() ? ';' : '';
      const searchString = `OR##name:${this.userName};OR##surname:${this.userName}${separator}${this.concatParameters()}`;
      // send every value from the inner to the subject
      this.expectationTime.next(searchString);
    } else {
      const searchString = `${this.concatParameters()}`;
      // send every value from the inner to the subject
      this.expectationTime.next(searchString);
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
