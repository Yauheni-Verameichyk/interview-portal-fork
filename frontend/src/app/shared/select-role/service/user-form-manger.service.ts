import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserFormMangerService {
  private isShowButton: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  public showButtonEmitter: Observable<boolean> = this.isShowButton.asObservable();
  constructor() { }

  showButton(isShow: boolean){
    this.isShowButton.next(isShow);
  }

}
