import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class PopupService {

  constructor() { }

  displayMessage(message: string, router: Router) {
    localStorage.setItem('message', message);
    router.navigate([{ outlets: { popup: 'message' } }]);
  }
}
