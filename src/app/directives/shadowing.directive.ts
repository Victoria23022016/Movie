import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appShadowing]',
})
export class ShadowingDirective {
  @HostBinding('style.boxShadow')
  boxShadow = 'none';

  @HostListener('mouseenter')
  addShadow() {
    this.boxShadow = '0 5px 10px gray';
  }

  @HostListener('mouseleave')
  removeShadow() {
    this.boxShadow = 'none';
  }
}
