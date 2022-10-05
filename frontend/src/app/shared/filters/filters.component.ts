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
  minPrice: String = "";
  maxPrice: String = "";
  searchValue: String = '';

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
    this.searchValue = data;
    this.SendFilters();
  }

  newMinprice(event: any): void {
    this.minPrice = event.minPrice
    this.SendFilters()
  }
  newMaxprice(event: any): void {
    this.maxPrice = event.maxPrice
    this.SendFilters()
  }

  SendFilters(): void {
    let filters: any = {};
    if (this.category_filter) {
      //console.log(this.category_filter);
      filters.category = this.category_filter;
    }
    if (this.order_price_filter) {
      filters.price_order = Number(this.order_price_filter);
    }
    if (this.order_likes_filter) {
      filters.likes_order = Number(this.order_likes_filter);
    }
    if (this.minPrice) {
      filters.minPrice = this.minPrice;
    }
    if (this.maxPrice) {
      filters.maxPrice = this.maxPrice;
    }
    if (this.searchValue) {
      filters.name = this.searchValue;
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
    this.Location.replaceState(`/shop/${btoa(JSON.stringify(filters))}`);
  }//setURL

  getURL() {
    let filters: any = {};
    try {
      filters = JSON.parse(atob(this.ActivatedRoute.snapshot.paramMap.get('filter') || ''));
    } catch (error) { }
    this.minPrice = filters.minPrice;
    this.maxPrice = filters.maxPrice;
    this.category_filter = filters.category || '';
    this.order_price_filter = String(filters.price_order || '');
    this.order_likes_filter = String(filters.likes_order || '');
    this.filterOutput.emit(filters);
  }
  remove_category() {
    this.category_filter = '';
    this.SendFilters()
  }

  remove_price() {
    this.order_price_filter = '';
    this.SendFilters()
  }

  remove_likes() {
    this.order_likes_filter = '';
    this.SendFilters()
  }

  remove_range_price() {
    this.minPrice = '';
    this.maxPrice = '';
    this.SendFilters()
  }

  remove_all() {
    this.category_filter = '';
    this.order_likes_filter = '';
    this.order_price_filter = '';
    this.minPrice = '';
    this.maxPrice = '';
    this.SendFilters()
  }
}//class
