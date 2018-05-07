import { Directive, ElementRef, Input, OnInit, Renderer } from '@angular/core';

@Directive({
  selector: '[appHighLightRole]'
})
export class HighLightRoleDirective implements OnInit {
  @Input('appHighLightRole') appHighLightRole: string;

  constructor(private elRef: ElementRef, private renderer: Renderer) { }

  ngOnInit(): void {
    const role: string = this.getRoles();
    switch (role) {
      case 'Coordinator': {
        this.renderer.createText(this.elRef.nativeElement, role);
        this.renderer.setElementClass(this.elRef.nativeElement, 'coordinator', true);
        break;
      }
      case 'Discipline head': {
        this.renderer.createText(this.elRef.nativeElement, role);
        this.renderer.setElementClass(this.elRef.nativeElement, 'discipline-head', true);
        break;
      }
      case 'Human resource': {
        this.renderer.createText(this.elRef.nativeElement, role);
        this.renderer.setElementClass(this.elRef.nativeElement, 'human-resource', true);
        break;
      }
      case 'Interviewer': {
        this.renderer.createText(this.elRef.nativeElement, role);
        this.renderer.setElementClass(this.elRef.nativeElement, 'interviewer', true);
        break;
      }
    }
  }
  private getRoles(): string {
    let transformRole: string = this.appHighLightRole;
    transformRole = transformRole.replace(/_/g, ' ').toLowerCase();
    return transformRole.charAt(0).toUpperCase() + transformRole.slice(1);
  }
}
