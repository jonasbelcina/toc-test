import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../user';
import { UserService } from '../user.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User('', '');
  errorMsg: string = '';
  showError : boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  // login form on submit
  onSubmit(): void {
    // hide error message on submit
    this.showError = false;

    const _user = this.user;

    let userData = JSON.stringify(_user);

    this.authService.login(userData).subscribe(
      data => {
        const _data : any = data;
        // save token to localStorage
        this.authService.setToken(_data.sessionToken);
        this.router.navigate(['events']);
      },
      err => {
        // console.log(err);
        this.showError = true;
        this.errorMsg = err.error.error;
      }
    );
  }

}
