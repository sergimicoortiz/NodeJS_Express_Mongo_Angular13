import { Component, OnInit } from '@angular/core';
import { UserService } from '../core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settingsForm: FormGroup;
  isSubmitting = false;

  userRegex: RegExp = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
  passwordRegex: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$/;
  emailRegex: RegExp = /^[a-zA-Z0-9_\.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$/;
  groupUsername: any = ['', [Validators.pattern(this.userRegex)]]
  groupPassword: any = ['', [Validators.pattern(this.passwordRegex)]]
  groupEmail: any = ['', [Validators.minLength(4), Validators.maxLength(30), Validators.pattern(this.emailRegex)]]

  constructor(private UserService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private ToastrService: ToastrService) {
    this.settingsForm = this.fb.group({
      'username': this.groupUsername,
      'password': this.groupPassword,
      'image': [''],
      'email': this.groupEmail
    });
  }

  ngOnInit(): void {
  }

  submitChange() {
    let change: any = {};
    let send: Boolean = false;
    this.UserService.currentUser.subscribe({
      next: data => {
        if (data.username != this.settingsForm.value.username && this.settingsForm.value.username.length !== 0) {
          change['username'] = this.settingsForm.value.username;
          send = true;
        }
        if (data.email != this.settingsForm.value.email && this.settingsForm.value.email.length !== 0) {
          change['email'] = this.settingsForm.value.email;
          send = true;
        }
        if (this.settingsForm.value.password.length !== 0) {
          change['password'] = this.settingsForm.value.password;
          send = true;
        }
        if (data.image != this.settingsForm.value.image && this.settingsForm.value.image.length !== 0) {
          change['image'] = this.settingsForm.value.image;
          send = true;
        }
      },
      error: e => console.error(e)
    })

    if (send) {
      this.UserService.settings_user(change).subscribe({
        next: data => {
          if (data.type == "error") {
            this.ToastrService.error("User or email already exist");
          } else {
            this.ToastrService.success("Updated correctly");
            this.UserService.setAuth(data.data);
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 3000);
          }
        },
        error: e => console.error(e)
      })
    } else {
      this.ToastrService.error("You cant use the same data and the form can't be empty");
    }
  }//submitChange

  logout() {
    this.UserService.purgeAuth();
    this.router.navigate(['/home']);
  }//logout
}//class
