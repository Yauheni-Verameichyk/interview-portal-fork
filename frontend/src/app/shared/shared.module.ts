import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowAuthedDirective } from './show-authed/show-authed.directive';
import { SelectUserComponent } from './select-user/select-user.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ ShowAuthedDirective, SelectUserComponent ],
  exports: [ ShowAuthedDirective, SelectUserComponent ]
})
export class SharedModule { }
