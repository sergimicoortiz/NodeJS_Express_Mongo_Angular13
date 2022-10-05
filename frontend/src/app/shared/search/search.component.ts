import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch, faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  faSearch = faSearch;
  faX = faX;
  @Input() search: String = '';

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
    const url_redirect: String = `/shop/${btoa(JSON.stringify(filters))}`
    if (this.Router.url.split('/')[1] === 'home') {
      this.Router.navigate([url_redirect]);
    } else {
      this.searchOutput.emit(event.search);
    }
  }//redirect_shop

  deleteSearch() {
    this.search = '';
    this.searchOutput.emit(this.search);
  }

}//class
