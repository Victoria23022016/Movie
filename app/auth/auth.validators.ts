import { AbstractControl } from '@angular/forms';

export class AuthValidators {
  static takenEmail(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value && window.localStorage.length) {
      if (JSON.parse(window.localStorage['users'])[`${control.value}`]) {
        return { takenEmail: true };
      }
    }
    return null;
  }
}
