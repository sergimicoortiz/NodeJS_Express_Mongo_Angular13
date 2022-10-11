import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UserService, User } from 'src/app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user?: User;

  constructor(
    private UserService: UserService,
    private Router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    /*  this.UserService.currentUser.subscribe({
       next: user => {
         this.user = user,
           this.cd.markForCheck()
       },
       error: e => console.error(e)
     }); */
  }

  // logout() {
  //   this.UserService.purgeAuth();
  //   this.Router.navigate(['/home']);
  // }//logut
}//class
