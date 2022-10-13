import { Component, OnInit } from '@angular/core';
import { UserService } from '../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private UserService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.UserService.purgeAuth();
    this.router.navigate(['/home']);
  }//logout
}//class
