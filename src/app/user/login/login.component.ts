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

        if (_data.sessionToken) {
          this.getUserProfile(_data);
        }
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

  // get user profile
  getUserProfile(user): void {
    const queryObject = {
      userId: user.objectId
    };

    const query = 'where=' + JSON.stringify(queryObject);

    this.userService.getUserProfile(query).subscribe(
      data => {
        const results: any = data;
        const profile = results.results[0];

        if (profile && profile.image) {
          // save profile picture to local storage
          localStorage.setItem('userImage', profile.image.url);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
