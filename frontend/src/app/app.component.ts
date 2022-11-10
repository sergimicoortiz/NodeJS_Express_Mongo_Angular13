import { Component, OnInit } from '@angular/core';
import { UserService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private UserService: UserService) { }

  ngOnInit(): void {
    //this.UserService.purgeAuth();
    this.UserService.populate();
  }
}//class
