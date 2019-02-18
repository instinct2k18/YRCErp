import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';
import { Roles } from './roles.model';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private roles: string;
  private token: string;
  private tokenTimer: NodeJS.Timer;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getRole() {
    return this.roles;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(username: string, password: string) {
    const authData: AuthData = { username: username, password: password };
    this.http.post(BACKEND_URL + '/user/create_user', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(username: string, password: string) {
    const authData: AuthData = {username: username, password: password};
    this.http.post<{roles: string, token: string, expiresIn: number}>(BACKEND_URL + '/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresIn = response.expiresIn;
          this.setAuthTimer(expiresIn);
          this.isAuthenticated = true;
          this.roles = response.roles;
          this.authStatusListener.next(true);
          const currentDate = new Date();
          const expirationDate = new Date(currentDate.getTime() + expiresIn * 10000 );
          this.saveAuthData(token, expirationDate, this.roles);
          if (this.roles === Roles.Clerk) {
            this.router.navigate(['home']);
          } else if (this.roles === Roles.Admin) {
            this.router.navigate(['admin/dashboard']);
          }
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const currentDate = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - currentDate.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      this.roles = authInformation.roles;
      if (this.roles === Roles.Admin) {
        this.router.navigate(['/admin/dashboard']);
      } else if (this.roles === Roles.Clerk) {
        this.router.navigate(['/home']);
      }
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, roles: string) {
    localStorage.setItem('roles', roles);
    localStorage.setItem('token', token );
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('roles');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const roles = localStorage.getItem('roles');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      roles: roles
    };
  }
}
