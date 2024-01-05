import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
@Injectable()
export class AuthGuard {
  constructor(private readonly _authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this._authService.checkCurrentUser();
  }
}

export const canActivateMain: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(AuthGuard).canActivate(route, state);
};
