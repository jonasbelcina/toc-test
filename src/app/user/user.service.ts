import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  private httpOptions;

  constructor(
    private http: HttpClient
  ) { }

  // sign up a new user
  signUp(data): Observable<Object> {
    return this.http.post(
      environment.parseServerUrl + '/users',
      data,
      this.httpHeader()
    );
  }

  uploadProfilePicture(data, name, type): Observable<Object> {
    return this.http.post(environment.parseServerUrl + '/files/' + name, data, this.profilePictureHeader(type));
  }

  // get users
  getUsers(): Observable<Object> {
    return this.http.get(environment.parseServerUrl + '/users', this.httpHeader());
  }

  httpHeader() {
    return (this.httpOptions = {
      headers: new HttpHeaders({
        "X-Parse-Application-Id": environment.parseAppId,
        "X-Parse-REST-API-Key": environment.parseClientKey,
        "X-Parse-Revocable-Session": "1",
        "Content-Type": "application/json"
      })
    });
  }

  profilePictureHeader(type) {
    return (this.httpOptions = {
      headers: new HttpHeaders({
        "X-Parse-Application-Id": environment.parseAppId,
        "X-Parse-REST-API-Key": environment.parseClientKey,
        "Content-Type": type
      })
    });
  }
}
