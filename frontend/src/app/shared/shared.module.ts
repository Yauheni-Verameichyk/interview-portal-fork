import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowAuthedDirective } from './show-authed/show-authed.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ ShowAuthedDirective ],
  exports: [ ShowAuthedDirective ]
})
export class SharedModule { }
