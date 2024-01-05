import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nz-spin-basic',
  template: ` <nz-spin nzSimple></nz-spin> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NzSpinBasicComponent {}
