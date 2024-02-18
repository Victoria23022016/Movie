import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
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
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, AuthValidators.takenEmail],
      ],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });

    if (window.localStorage.length && this._authService.checkCurrentUser()) {
      this._router.navigate(['/home']);
    }
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }

  submit(): void {
    this.formData = { ...this.form.value, favourites: {} };
    this._authService.addUserToLocalStorage(this.formData);
    this._router.navigate(['/home']);
  }
}
