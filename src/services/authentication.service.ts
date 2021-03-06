import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export class User {
  constructor(
    public email: string,
    public password: string) { }
}

const users = [
  new User('eurofood', 'PuShN0t1fy2018'),
  new User('nicola.lanzilotto@frontiere21.it', '123456'),
];

@Injectable()
export class AuthenticationService {

  constructor(
    private router: Router,
  ) { }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  login(user) {
    const authenticatedUser = users.find(u => u.email === user.email);
    if (authenticatedUser && authenticatedUser.password === user.password) {
      // localStorage.setItem('user', authenticatedUser);
      localStorage.setItem('user', authenticatedUser.email);
      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;

  }

  checkCredentials() {
    if (localStorage.getItem('user') === null) {
      this.router.navigate(['/login']);

    }
  }

}
