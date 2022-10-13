import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authType: String = '';
  title: String = '';
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private UserService: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private ToastrService: ToastrService
  ) {
    this.authForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      if (this.authType === 'register') {
        this.authForm = this.fb.group({
          'username': ['', Validators.required],
          'email': ['', Validators.required],
          'password': ['', Validators.required]
        });
      }
      this.cd.markForCheck();
    });
  }

  submitForm() {
    console.log('a');
    this.isSubmitting = true;
    const data = this.authForm.value
    if (this.authType === 'login') {
      this.UserService.login(data).subscribe({
        next: data => {
          this.ToastrService.success("Login succefull");
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 3000);
        },
        error: e => {
          console.error(e)
          this.ToastrService.error("This user or password is not correct");
          this.isSubmitting = false;
        }
      })
    } else if (this.authType === 'register') {
      this.UserService.register(data).subscribe({
        next: data => {
          if (data.type === 'error') {
            this.ToastrService.error("This user already created");
            this.isSubmitting = false;
          } else {
            this.ToastrService.success("Registered successfully moving to login");
            setTimeout(() => {
              this.router.navigate(['/auth/login']);
            }, 3000);
          }
        },
        error: e => console.error(e)
      })
    }
  }//submitForm
}//class