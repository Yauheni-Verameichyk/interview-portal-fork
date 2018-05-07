import { HighLightRoleDirective } from './high-light-role.directive';
import { ElementRef, Renderer } from '@angular/core';
const elementRefStub: ElementRef = {
  nativeElement() { }
};
const rendererStub: any = {
};
describe('HighLightRoleDirective', () => {
  it('should create an instance', () => {
    const directive = new HighLightRoleDirective(elementRefStub, rendererStub);
    expect(directive).toBeTruthy();
  });
});
