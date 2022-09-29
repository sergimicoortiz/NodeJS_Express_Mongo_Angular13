import { Component, Directive, Input, OnInit } from '@angular/core';
import { ProductService, Product, CategoryService, Category } from '../../core'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {

  products$?: Product[];
  category_slug: String = "";
  categorys?: Category[];
  offset = 0;

  @Input() home = false;

  constructor(
    private ProductService: ProductService,
    private CategoryService: CategoryService,
    private ActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.category_slug = this.ActivatedRoute.snapshot.paramMap.get('slug') || "";
    this.get_products();
  }

  getScrollRequestParams(offset: number, limit: number): any {
    let params: any = {};

    params[`offset`] = offset;
    params[`limit`] = limit;

    return params;
  }

  get_products(): void {
    this.ProductService.products = [];
    if (this.ProductService.products.length == 0) {
      if (this.category_slug !== "" && this.home == false) {
        this.CategoryService.get(this.category_slug).subscribe({
          next: data => {
            this.ProductService.products = data.category_products
          },
          error: e => {
            console.error(e)
          }
        });
      } else if (this.category_slug == "" && this.home == true) {
        const params = this.getScrollRequestParams(this.offset, 6);
        console.log(params)
        this.ProductService.all_products_popular(params).subscribe({
          next: (data) => {
            this.ProductService.products = data,
              this.offset = this.offset + 6,
              console.log(this.offset)
          },
          error: (e) => { console.error(e) }
        });
      }
      else {
        this.ProductService.all_products().subscribe({
          next: data => this.ProductService.products = data,
          error: e => console.error(e)
        });
      }//end else if
    }
    this.ProductService.products$.subscribe({
      next: data => this.products$ = data,
      error: e => console.error(e)
    });
  }//get_products

  onScroll() {
    console.log("asd")
    this.get_products();
  }
}//class
