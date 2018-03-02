import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageWindowComponent } from './message-window/message-window.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MessageWindowComponent],
  exports: [MessageWindowComponent]
})
export class MessageModule { }
