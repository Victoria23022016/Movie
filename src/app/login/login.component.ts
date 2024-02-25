import { ChangeDetectionStrategy, Component } from '@angular/core';
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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  form: FormGroup;
  formData: User;

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }

  logIn(): void {
    this.formData = { ...this.form.value };
    this._authService.logIn(this.formData);
    this.form.reset();
    this._router.navigate(['/home']);
  }

  logOut(): void {
    this._authService.logOut();
  }
}
