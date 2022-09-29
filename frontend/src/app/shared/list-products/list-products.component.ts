import { Component, OnInit } from '@angular/core';
import { ProductService, Product, CategoryService, Category } from '../../core'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  products$?: Product[];
  category_slug: String = "";
  categorys?: Category[];
  params: any = {
    page: 1,
    size: 9
  }
  currentPage: Number = 1;
  lastPage: Number = 1;
  pages: Number[] = [];

  constructor(
    private ProductService: ProductService,
    private CategoryService: CategoryService,
    private ActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.category_slug = this.ActivatedRoute.snapshot.paramMap.get('slug') || "";
    this.get_products();
  }

  get_products(): void {
    this.ProductService.products = [];
    if (this.ProductService.products.length == 0) {
      if (this.category_slug !== "") {
        this.CategoryService.get(this.category_slug).subscribe({
          next: data => {
            this.ProductService.products = data.category_products
          },
          error: e => {
            console.error(e)
          }
        });
      } else {
        this.ProductService.all_products(this.params).subscribe({
          next: data => {
            this.ProductService.products = data.docs;
            this.currentPage = data.page;
            this.lastPage = data.totalPages;
            this.CalculatePages();
            console.log(this.pages);
          },
          error: e => console.error(e)
        });
      }//end else if
    }
    this.ProductService.products$.subscribe({
      next: data => this.products$ = data,
      error: e => console.error(e)
    });
  }//get_products

  CalculatePages() {
    if (this.currentPage === 1) {
      for (let i = 2; i <= 6; i++) {
        if (i > this.lastPage) {
          this.pages.push(i);
        }

      }
    }
  }

}//class
