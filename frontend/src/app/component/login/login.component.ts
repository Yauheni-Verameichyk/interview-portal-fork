import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output() onChanged = new EventEmitter();
  
  constructor(private router: Router) {}

  change(){
    this.onChanged.emit();
    this.router.navigate(['user']);
  }

}
