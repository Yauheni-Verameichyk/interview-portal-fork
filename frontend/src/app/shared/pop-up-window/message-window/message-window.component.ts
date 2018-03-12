import { Component } from '@angular/core';

@Component({
  selector: 'app-message-window',
  templateUrl: './message-window.component.html',
  styleUrls: ['./message-window.component.css']
})
export class MessageWindowComponent   {

  get message(): string {
    return localStorage.getItem('message');
  }
}
