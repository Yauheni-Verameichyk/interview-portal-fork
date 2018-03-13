import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message-window',
  templateUrl: './message-window.component.html',
  styleUrls: ['./message-window.component.css']
})
export class MessageWindowComponent {

  constructor(private route: ActivatedRoute) {  }

  get message(): string {
    return this.route.snapshot.paramMap.get('message');
  }
}
