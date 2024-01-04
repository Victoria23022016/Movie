import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @HostBinding('style.background')
  background = '#fff';

  @HostListener('mouseenter')
  addHighlight() {
    this.background = '#ECEFF1';
  }

  @HostListener('mouseleave')
  removeHighlight() {
    this.background = '#fff';
  }
}
