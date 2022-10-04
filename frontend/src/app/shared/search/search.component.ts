import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search: string = '';

  @Output() searchOutput: EventEmitter<String> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  keyup(event: any) {
    this.searchOutput.emit(event.search);
  }//keyup

}//class
