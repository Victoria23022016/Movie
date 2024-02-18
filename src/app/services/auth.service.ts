import { Injectable } from '@angular/core';
import { User } from '../models/models';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly _notification: NzNotificationService) {}

  addUserToLocalStorage(user: User): void {
    if (window.localStorage['users']) {
      const parsedUsers = JSON.parse(window.localStorage['users']);
      parsedUsers[`${user.email}`] = user;
      window.localStorage['users'] = JSON.stringify(parsedUsers);
    } else {
      window.localStorage['users'] = JSON.stringify({
        [`${user.email}`]: user,
      });
    }
    window.localStorage['currentUser'] = JSON.stringify(user);
    this._notification.success('', 'Your authorization was successful!');
  }

  logIn(user: User): void {
    if (this.checkUser(user.email)) {
      if (this.checkPassword(user)) {
        window.localStorage['currentUser'] = JSON.stringify(user);
        this._notification.success('', 'You are logged in!');
      } else {
        this._notification.error('', 'The password is wrong!');
      }
    } else {
      this._notification.error('', 'This email is not registered!');
    }
  }

  logOut(): void {
    window.localStorage['currentUser'] = null;
    this._notification.create('warning', '', 'You logged out!');
  }

  getCurrentUser(): User {
    return JSON.parse(window.localStorage['currentUser']);
  }

  checkCurrentUser(): boolean {
    if (window.localStorage) {
      return JSON.parse(window.localStorage['currentUser']) ? true : false;
    } else {
      return false;
    }
  }

  checkUser(email: string): boolean {
    return JSON.parse(window.localStorage['users'])[`${email}`] ? true : false;
  }

  checkPassword(user: User): boolean {
    const checkedUser = JSON.parse(window.localStorage['users'])[
      `${user.email}`
    ];
    return checkedUser.password === user.password ? true : false;
  }
}
