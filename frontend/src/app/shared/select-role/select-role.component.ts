import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserFormMangerService } from './service/user-form-manger.service';

@Component({
  selector: 'appSelectRole',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.css']
})
export class SelectRoleComponent implements OnInit {
  @Output() editRoles = new EventEmitter<Array<string>>();
  @Input() roles: Array<string>;

  isShowButton: boolean = false;

  constructor(private buttonManager: UserFormMangerService) {
    buttonManager.showButtonEmitter.subscribe(isShow=>{
      this.isShowButton = isShow;
    })
   }
 

  ngOnInit() {
    
  }
  rolesChanges():void{
    this.editRoles.emit(this.roles);
  }
  deleteRole(index: number) :void{
    console.log(index);
    this.roles.splice(index, 1);
    console.log(this.roles);
    this.rolesChanges();
  }

  transformStyle(role: string): string{
    role = role.replace(/_/g, " ").toLowerCase();
    return role.charAt(0).toUpperCase() + role.slice(1) ;
    
  }
}
