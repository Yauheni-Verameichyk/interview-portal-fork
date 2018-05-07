import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserCredentials } from '../../domain/UserCredentials';
import { UserInfo } from '../../domain/UserInfo';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs';
import { UserControllerService } from '../../api/rest/service/user-controller.service';

@Component({
  selector: '[app-user]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnDestroy {
  private readonly destroy: Subject<void> = new Subject();
  @Input() user: UserInfo;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userController: UserControllerService) { }
  showUserInfo() {
    this.router.navigate([{ outlets: { popup: ['users', this.user.id, 'info'] } }]);
  }
  editUserInfo() {
    this.router.navigate([{ outlets: { popup: ['users', this.user.id, 'edit'] } }]);
  }
  removeUser() {
    if (confirm('Delete user ' + this.user.name)) {
      this.userController.deleteUser(this.user.id)
      .takeUntil(this.destroy)
      .subscribe( () => {
        alert('User deleted successfully');
        this.router.navigate(['/users']);
      });
    }
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
