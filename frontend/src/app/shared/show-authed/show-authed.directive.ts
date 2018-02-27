import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[requiredAuthority]'
})
export class ShowAuthedDirective implements OnInit {

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  @Input('requiredAuthority') requiredAuthority: string;

  ngOnInit() {
    if ((this.getAuthorities().indexOf(this.requiredAuthority) > -1)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private getAuthorities(): Array<String> {
    return (localStorage.getItem('permissions') == null) ? [] : JSON.parse(localStorage.getItem('permissions'));
  }
}
