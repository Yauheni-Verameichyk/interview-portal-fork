import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowAuthedDirective } from './show-authed/show-authed.directive';
import { SelectUserComponent } from './select-user/select-user.component';
import { ValidatorMessageComponent } from './validator/validator-message.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectRoleComponent } from './select-role/select-role.component';
import { UserFormMangerService } from './select-role/service/user-form-manger.service';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  declarations: [ ShowAuthedDirective, SelectUserComponent, ValidatorMessageComponent, SelectRoleComponent ],
  providers: [ UserFormMangerService ],
  exports: [ ShowAuthedDirective, SelectUserComponent, ValidatorMessageComponent, SelectRoleComponent ]
})
export class SharedModule { }
