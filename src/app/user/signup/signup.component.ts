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
  imageAdded: boolean = false;

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

    if (this.imageAdded) {
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
    } else {
      this.createUser();
    }
  }

  createUser() {
    const newUser = this.imageAdded
    ? {
        username: this.user.email,
        email: this.user.email,
        password: this.user.password,
        image: {
          name: this.image.uploadedName,
          url: this.image.url,
          __type: 'File'
        }
      }
      : {
          username: this.user.email,
          email: this.user.email,
          password: this.user.password
        };

    let userData = JSON.stringify(newUser);

    this.userService.signUp(userData).subscribe(
      data => {
        // clear form and variables when user is successfully created
        this.userCreated = true;
        this.form.reset();
        this.imageAdded = false;

        if (this.image.url != '' && this.image.uploadedName != '') {
          const _user: any = data;
          // save image to UserProfile
          this.updateUserProfile(_user);
        } else {
          // clear image object
          this.image = {
            data: '',
            name: 'Profile picture',
            type: '',
            url: '',
            uploadedName: ''
          };
        }
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

  updateUserProfile(user): void {
    const profile = {
      userId: user.objectId,
      image: {
        name: this.image.uploadedName,
        url: this.image.url,
        __type: 'File'
      }
    };

    this.userService.updateProfile(JSON.stringify(profile)).subscribe(
      data => {
        console.log(data);
        // clear image object
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
      }
    );
  }

  // when image is added
  onImageChange(event) {
    let image = event.target.files[0];

    if (image) {
      this.imageAdded = true;
      this.image.data = image;
      this.image.name = image.name;
      this.image.type = image.type;
    }
  }

}
