import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message-window',
  templateUrl: './message-window.component.html',
  styleUrls: ['./message-window.component.css']
})
export class MessageWindowComponent  {

  @Output() displayWindowMessage = new EventEmitter();
  @Input() message: string;

  close() {
    this.displayWindowMessage.emit();
  }


}
