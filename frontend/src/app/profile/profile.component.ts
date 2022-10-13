import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../core/models/profile.model';
import { User, UserService } from '../core';
import { concatMap, tap } from 'rxjs/operators';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: Profile = {} as Profile;
  currentUser: User = {} as User;
  isUser: boolean = false

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => this.profile = data['profile'] as Profile,
      error: e => console.error(e)
    });//get profile
    this.userService.currentUser.subscribe({
      next: data => this.isUser = (data.username === this.profile.username),
      error: e => console.error(e)
    });//check current user
    console.log(this.isUser);
  }

}//class