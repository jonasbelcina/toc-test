import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authService.getToken()) {
        return this.authService.validateToken().map(
          data => {
            const result: any = data;
            if (result.code == 202) {
              this.router.navigate(['login']);
              return false;
            }
            return true;
          },
          err => {
            return false;
          }
        );
      } else {
        this.router.navigate(['login']);
        return false;
      }
  }
}
