import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search: string = '';

  @Output() searchOutput: EventEmitter<String> = new EventEmitter();
  constructor(
    private Router: Router
  ) { }

  ngOnInit(): void {
  }

  keyup(event: any) {
    this.searchOutput.emit(event.search);
  }//keyup

  redirect_shop(event: any): void {
    const filters: any = {
      name: event.search
    }
    const url_redirect: String = `/shop/filter/${btoa(JSON.stringify(filters))}`
    if (this.Router.url.split('/')[1] === 'home') {
      this.Router.navigate([url_redirect]);
    } else {
      this.searchOutput.emit(event.search);
    }
  }//redirect_shop

}//class
