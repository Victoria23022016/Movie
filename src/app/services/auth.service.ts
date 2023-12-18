import { Injectable } from '@angular/core';
import { User } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
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
  }

  logIn(user: User): void {
    window.localStorage['currentUser'] = JSON.stringify(user);
    //добавить уведомление о логине
  }

  logOut(): void {
    window.localStorage['currentUser'] = null;
    //добавить уведомление о логауте
  }

  checkCurrentUser(): boolean {
    return JSON.parse(window.localStorage['currentUser']) ? true : false;
  }

  checkUser(email: string): boolean {
    return JSON.parse(window.localStorage['users'])[`${email}`] ? true : false;
  }

  checkPassword(user: User): boolean {
    const checkedUser = JSON.parse(window.localStorage['users'])[
      `${user.email}`
    ];
    //добавить уведомление о неверном пароле?
    return checkedUser.password === user.password ? true : false;
  }
}
