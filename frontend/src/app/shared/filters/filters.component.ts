import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {


  @Output() filterOutput: EventEmitter<String> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  search(data: String): void {
    this.SendFilters(data);
  }

  SendFilters(search: String): void {
    let filters: any = {};
    if (search) {
      filters.name = search;
    }
    this.filterOutput.emit(filters);
  }//SendFilters

}//class
