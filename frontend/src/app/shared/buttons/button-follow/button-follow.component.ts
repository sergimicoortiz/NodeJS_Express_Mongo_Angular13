import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilesService, UserService } from 'src/app/core';
import { Profile } from 'src/app/core/models/profile.model';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-button-follow',
  templateUrl: './button-follow.component.html',
  styleUrls: ['./button-follow.component.scss']
})
export class ButtonFollowComponent implements OnInit {

  constructor(
    private profilesService: ProfilesService,
    private router: Router,
    private userService: UserService,
    private ToastrService: ToastrService
  ) { }

  @Input() profile: Profile = {} as Profile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;
  isUser: Boolean = false;
  ngOnInit(): void {
  }
  
  toggleFollowing() {
    this.isSubmitting = true;
    this.userService.isAuthenticated.pipe(take(1)).subscribe({
      next: data => {
        if (data == false) {
          this.ToastrService.error("Login for follow");
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 3000);
        } else {
          if (!this.profile.following) {
            this.profilesService.follow(this.profile.username).subscribe({
              next: data => {
                if (data.type = "success") {
                  this.isSubmitting = false;
                  this.toggle.emit(true);
                }
              },
                error: error => console.error(error)
            });
          }else{
            this.profilesService.unfollow(this.profile.username).subscribe({
              next: data => {
                if (data.type = "success") {
                  this.isSubmitting = false;
                  this.toggle.emit(false);
                }
              },
                error: error => console.error(error)
            });
          }
        }
      },
      error: e => console.error(e),
    })
  }

}
