import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  private httpOptions;

  constructor(
    private http: HttpClient
  ) { }

  // set session token on localStorage
  setToken(token) {
    localStorage.setItem('sessionToken', token);
  }

  // get session token from localStorage
  getToken() {
    return localStorage.getItem('sessionToken');
  }

  // delete session token from localStorage
  deleteToken() {
    localStorage.removeItem('sessionToken');
  }

  // validate token / retrieve current user
  validateToken(): Observable<Object> {
    return this.http.get(environment.parseServerUrl + '/users/me', this.httpHeader());
  }

  // check if user is logged in
  isLoggedIn() {
    if (this.getToken()) {
      this.validateToken().subscribe(
        data => {
          const user: any = data;
          console.log(user);

          if (user.code == 209) {
            return false;
          } else {
            console.log(true);
            return true;
          }
        },
        err => {
          console.log(err);
          return false;
        }
      );
    }
  }

  // login a user
  login(data): Observable<Object> {
    return this.http.post(
      environment.parseServerUrl + '/login',
      data,
      this.loginHeader()
    );
  }

  // logout
  logout(): Observable<Object> {
    return this.http.post(environment.parseServerUrl + '/logout', '', this.httpHeader());
  }

  httpHeader() {
    return (this.httpOptions = {
      headers: new HttpHeaders({
        "X-Parse-Application-Id": environment.parseAppId,
        "X-Parse-REST-API-Key": environment.parseClientKey,
        "X-Parse-Session-Token": this.getToken()
      })
    });
  }

  // headers for login
  loginHeader() {
    return (this.httpOptions = {
      headers: new HttpHeaders({
        "X-Parse-Application-Id": environment.parseAppId,
        "X-Parse-REST-API-Key": environment.parseClientKey,
        "X-Parse-Revocable-Session": "1",
        "Content-Type": "application/json"
      })
    });
  }

}
