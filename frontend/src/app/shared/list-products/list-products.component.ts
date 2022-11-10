import { Component, Input, OnInit } from '@angular/core';
import { ProductService, Product } from '../../core'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {

  products$?: Product[];
  category_slug: String = "";
  pageScroll = 1;
  currentPage: Number = 1;
  lastPage: number = 1;
  pages: Number[] = [];

  @Input() home = false;
  params: any = {
    page: 1,
    size: 10
  }

  constructor(
    private ProductService: ProductService,
    private ActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.category_slug = this.ActivatedRoute.snapshot.paramMap.get('slug') || "";
    this.get_products();
    document.addEventListener('click', e => e.preventDefault());
  }

  getScrollRequestParams(page: number, limit: number): any {
    let params: any = {};
    params[`limit`] = page * limit;
    return params;
  }//getScrollRequestParams

  filters(data: any) {
    this.params = {
      page: 1,
      size: 10
    };

    if (data.name) {
      this.params.name = data.name;
    }

    if (data.price_order) {
      this.params.price_order = data.price_order;
    }

    if (data.likes_order) {
      this.params.likes_order = data.likes_order;
    }

    if (data.minPrice) {
      this.params.minPrice = data.minPrice;
    }

    if (data.maxPrice) {
      this.params.maxPrice = data.maxPrice;
    }

    if (data.category) {
      this.category_slug = data.category;
    } else {
      this.category_slug = '';
    }
    this.get_products();
  }//filters

  get_products(): void {
    this.ProductService.products = [];

    if (this.ProductService.products.length == 0) {
      if (this.home == false) {
        this.ProductService.all_products(this.params, this.category_slug).subscribe({
          next: data => {
            this.ProductService.products = data.docs;
            this.currentPage = data.page;
            this.lastPage = Number(data.totalPages);
            this.CalculatePages();
          },
          error: e => console.error(e)
        });
      } else {
        this.onScroll();
      }//end else if
    }//if

    this.ProductService.products$.subscribe({
      next: data => this.products$ = data,
      error: e => console.error(e)
    });
  }//get_products

  onScroll() {
    if (this.ProductService.products.length < 12) {
      const params = this.getScrollRequestParams(this.pageScroll, 3);
      this.ProductService.all_products_popular(params).subscribe({
        next: (data) => {
          this.ProductService.products = data;
          this.pageScroll++;
        },
        error: (e) => { console.error(e) }
      });
    }
  }//onScroll

  CalculatePages(): void {
    this.pages = [];
    if (this.currentPage === 1) {
      for (let i = 2; i <= 6; i++) {
        if (i < this.lastPage) {
          this.pages.push(i);
        }
      }//for
    }
    else if (this.currentPage === this.lastPage) {
      for (let i = Number(this.lastPage) - 1; i > 1; i--) {
        if (i > Number(this.lastPage) - 6) {
          this.pages.push(i);
        }//if
      }//for
    }
    else {
      this.pages = [this.currentPage];
      for (let i = 1; i < 4; i++) {
        if (Number(this.currentPage) + i < this.lastPage) {
          this.pages.push(Number(this.currentPage) + i);
        }
        if (Number(this.currentPage) - i > 1) {
          this.pages.unshift(Number(this.currentPage) - i);
        }
      }//for
      if (this.pages.length > 6) {
        this.pages.pop();
      }//if
    }//else if
  }//CalculatePages

  SetPage(page: Number, sum: any = 0): void {
    if (this.currentPage !== page + sum) {
      this.params.page = page + sum;
      this.get_products();
    }//if
  }//SetPage

}//class
