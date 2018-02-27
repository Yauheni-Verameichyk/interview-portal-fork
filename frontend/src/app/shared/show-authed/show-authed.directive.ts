import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';

@Directive({
  selector: '[requiredAuthority]'
})
export class ShowAuthedDirective implements OnInit {

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef, private authenticationService: AuthenticationService) { }

  @Input('requiredAuthority') requiredAuthority: string;

  ngOnInit() {
    if (this.authenticationService.isPermissionPresent(this.requiredAuthority)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
