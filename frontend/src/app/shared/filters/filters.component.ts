import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/core';
import { CategoryService } from 'src/app/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {


  @Output() filterOutput: EventEmitter<String> = new EventEmitter();
  category_filter: String = "";
  order_price_filter: String = "";
  order_likes_filter: String = "";
  categorys: Category[] = [];

  constructor(
    private CategoryService: CategoryService,
    private ActivatedRoute: ActivatedRoute,
    private Location: Location
  ) { }

  ngOnInit(): void {
    this.get_categorys();
    this.getURL();
  }

  search(data: String): void {
    this.SendFilters(data);
  }

  SendFilters(search?: String): void {
    let filters: any = {};
    if (this.category_filter) {
      filters.category = this.category_filter;
    }
    if (search) {
      filters.name = search;
    }
    this.setURL(filters);
    this.filterOutput.emit(filters);
  }//SendFilters

  get_categorys() {
    this.CategoryService.getAll().subscribe({
      next: data => this.categorys = data,
      error: error => console.error(error)
    });
  }//get_categorys

  setURL(filters: any) {
    const category: String | null = this.ActivatedRoute.snapshot.paramMap.get('slug');
    if (category) {
      this.Location.replaceState(`/shop/category/${category}/${btoa(JSON.stringify(filters))}`);

    } else {
      this.Location.replaceState(`/shop/filter/${btoa(JSON.stringify(filters))}`);
    }//end else if
  }//setURL

  getURL() {
    let filters: any = {};
    try {
      filters = JSON.parse(atob(this.ActivatedRoute.snapshot.paramMap.get('filter') || ''));
    } catch (error) {

    }
    this.filterOutput.emit(filters);
  }
}//class
