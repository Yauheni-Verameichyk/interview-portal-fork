import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  OnChanges,
  HostListener,
  OnDestroy
} from '@angular/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';

@Directive({
  selector: '[requiredAuthority]'
})
export class ShowAuthedDirective implements OnChanges {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authenticationService: AuthenticationService) { }

  @Input('requiredAuthority') requiredAuthority: string;

  @HostListener('change') ngOnChanges() {
    this.updateView();
  }

  updateView() {
    this.viewContainer.clear();
    if (this.authenticationService.isPermissionPresent(this.requiredAuthority)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
