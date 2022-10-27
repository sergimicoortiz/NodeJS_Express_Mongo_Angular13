import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
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
  isSubmitting: Boolean = false;
  authForm: FormGroup;
  userRegex: RegExp = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
  passwordRegex: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$/;
  emailRegex: RegExp = /^[a-zA-Z0-9_\.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$/;
  groupUsername: any = ['', [Validators.required, Validators.pattern(this.userRegex)]]
  groupPassword: any = ['', [Validators.required, Validators.pattern(this.passwordRegex)]]
  groupEmail: any = ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern(this.emailRegex)]]

  groupPasswordLogin: any = ['', [Validators.required]]
  groupUsernameLogin: any = ['', [Validators.required]]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private UserService: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private ToastrService: ToastrService
  ) {
    this.authForm = this.fb.group({
      'username': this.groupUsernameLogin,
      'password': this.groupPasswordLogin
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      if (this.authType === 'register') {
        this.authForm = this.fb.group({
          'username': this.groupUsername,
          'password': this.groupPassword,
          'email': this.groupEmail,
        });
      }
      this.cd.markForCheck();
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.authForm.controls;
  }

  submitForm() {
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