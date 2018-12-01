import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class EventsService {
  private httpOptions;

  constructor(
    private http: HttpClient
  ) { }

  // get events
  getEvents(): Observable<Object> {
    return this.http.get(environment.parseServerUrl + '/classes/Event', this.httpHeader());
  }

  // get products
  getProducts(): Observable<Object> {
    // { params: new HttpParams().set('name', term) }
    return this.http.get(environment.parseServerUrl + '/classes/Product', this.httpHeader());
  }

  httpHeader() {
    return (this.httpOptions = {
      headers: new HttpHeaders({
        "X-Parse-Application-Id": environment.parseAppId,
        "X-Parse-REST-API-Key": environment.parseClientKey
      })
    });
  }

}
