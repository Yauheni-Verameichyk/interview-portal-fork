import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class NavbarManager {

  private isShowNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showNavBarEmitter: Observable<boolean> = this.isShowNavBar.asObservable();

  constructor() {}

  showNavbar(isShow: boolean) {
      this.isShowNavBar.next(isShow);
  }


}
