import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../core/models/profile.model';
import { User, UserService } from '../core';
import { concatMap ,  tap } from 'rxjs/operators';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // console.log(this.route.snapshot.paramMap.get("a"))
  }

}
