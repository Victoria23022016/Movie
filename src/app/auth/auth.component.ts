import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/models';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthValidators } from './auth.validators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  formData: User;

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        AuthValidators.takenEmail,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
    if (window.localStorage && this._authService.checkCurrentUser()) {
      this._router.navigate(['/home']);
    }
  }

  submit(): void {
    this.formData = { ...this.form.value, favourites: {} };
    this._authService.addUserToLocalStorage(this.formData);
    this._router.navigate(['/home']);
    console.log(window.localStorage);
  }
}
