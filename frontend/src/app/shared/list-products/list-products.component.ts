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
    size: 10
  }
  currentPage: Number = 1;
  lastPage: number = 1;
  pages: Number[] = [];

  constructor(
    private ProductService: ProductService,
    private CategoryService: CategoryService,
    private ActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.category_slug = this.ActivatedRoute.snapshot.paramMap.get('slug') || "";
    this.get_products();

    document.addEventListener('click', e => e.preventDefault());
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
            this.lastPage = Number(data.totalPages);
            this.CalculatePages();
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
