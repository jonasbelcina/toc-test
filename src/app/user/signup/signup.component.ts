import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user: User = new User('', '');
  @ViewChild('userForm') form;
  emailExists: boolean = false;
  errorMsg : string = '';
  image = {
    data: '',
    name: 'Profile picture',
    type: '',
    url: '',
    uploadedName: ''
  };
  invalidImage: boolean = false;
  userCreated: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  // signup form on submit
  onSubmit(): void {

    this.emailExists = false;
    this.invalidImage = false;

    // upload image
    this.userService.uploadProfilePicture(this.image.data, this.image.name, this.image.type).subscribe(
      data => {
        // on success get uploaded image name and url, then call sign up api
        const result: any = data;
        this.image.url = result.url;
        this.image.uploadedName = result.name;

        this.createUser();
      },
      err => {
        // console.log(err);
        this.invalidImage = true;
      }
    );
  }

  createUser() {
    const newUser = {
      username: this.user.email,
      email: this.user.email,
      password: this.user.password,
      image: {
        name: this.image.uploadedName,
        url: this.image.url,
        __type: 'File'
      }
    };

    let userData = JSON.stringify(newUser);

    this.userService.signUp(userData).subscribe(
      data => {
        this.userCreated = true;
        this.form.reset();
        this.image = {
          data: '',
          name: 'Profile picture',
          type: '',
          url: '',
          uploadedName: ''
        };
      },
      err => {
        console.log(err);
        if (err.error.code == 202) {
          this.emailExists = true;
          this.errorMsg = 'An account already exists for this email.';
        } else {
          this.errorMsg = err.error.error;
        }
      }
    );
  }

  // when image is added
  onImageChange(event) {
    let image = event.target.files[0];

    this.image.data = image;
    this.image.name = image.name;
    this.image.type = image.type;
  }

}
