import { Component, OnInit } from '@angular/core';
import { UserService } from '../core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settingsForm: FormGroup;
  isSubmitting = false;

  constructor(private UserService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private ToastrService: ToastrService) {
    this.settingsForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
      'image': ['', Validators.required],
      'email': ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submitChange() {
    let change: {} | any;
    this.UserService.currentUser.subscribe({
      next: data => {
        if (data.username != this.settingsForm.value.username) {
          change = { "username": this.settingsForm.value.username, "password": this.settingsForm.value.password, "image": this.settingsForm.value.image }
        }
        if (data.email != this.settingsForm.value.email) {
          change = { "email": this.settingsForm.value.email, "password": this.settingsForm.value.password, "image": this.settingsForm.value.image }
        }
        if (data.username != this.settingsForm.value.username && data.email != this.settingsForm.value.email) {
          change = { "username": this.settingsForm.value.username, "email": this.settingsForm.value.email, "password": this.settingsForm.value.password, "image": this.settingsForm.value.image }
        }
      },
      error: e => console.error(e)
    })

    if (change) {
      this.UserService.settings_user(change).subscribe({
        next: data => {
          if (data.type == "error") {
            this.ToastrService.error("User or email already exist");
          }else{
            this.ToastrService.success("Updated correctly");
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 3000)
          }
          },
        error: e => console.error(e)
      })
    } else {
      this.ToastrService.error("You cant use the same data");
    }
  }

  logout() {
    this.UserService.purgeAuth();
    this.router.navigate(['/home']);
  }//logout
}//class
