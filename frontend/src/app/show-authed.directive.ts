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

  // @Input()
  permission: string;

  constructor(  private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {  }

    @Input() set requiredAuthority(requiredAuthority: string) {
      console.log(requiredAuthority);
      this.permission = requiredAuthority;
    }

    ngOnInit() {
      console.log(this.permission);
      console.log(this.getAuthorities().indexOf(this.permission));
          if (this.getAuthorities().indexOf(this.permission) > -1) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          } else {
            this.viewContainer.clear();
          }
    }


    private getAuthorities(): Array<String> {
      return [
        "SUB_ITEM_DELETE_JAVA",
        "SUB_ITEM_CREATE_JAVA",
        "SUB_ITEM_CREATE_C",
        "SUB_ITEM_READ_JAVA",
        "CANDIDATE_READ",
        "SUB_ITEM_DELETE_C",
        "CANDIDATE_EDIT",
        "CANDIDATE_DELETE",
        "SUB_ITEM_READ_C",
        "CANDIDATE_CREATE",
        "SUB_ITEM_EDIT_JAVA",
        "SUB_ITEM_EDIT_C"
    ];
    }
}
