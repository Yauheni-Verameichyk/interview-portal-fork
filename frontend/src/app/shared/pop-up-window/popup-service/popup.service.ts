import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class PopupService {

  constructor() { }

  displayMessage(message: string, router: Router) {
    router.navigate([{ outlets: { popup: ['message', message]}} ] , { skipLocationChange: true });
  }
}
