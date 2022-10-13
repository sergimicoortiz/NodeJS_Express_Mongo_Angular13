import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/core';
import { Router } from '@angular/router';
import { UserService, User } from 'src/app/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoged: Boolean = false;
  user: User = {} as User;

  constructor(
    private JwtService: JwtService,
    private UserService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.UserService.currentUser.subscribe({
      next: data => {
        if (data.username) {
          this.isLoged = true;
          this.user = data;
        } else {
          this.isLoged = false;
        }
      },
      error: e => console.error(e)
    }
    );
  }

  logout() {
    this.UserService.purgeAuth();
    this.router.navigate(['/home']);
  }//logout
}//class
