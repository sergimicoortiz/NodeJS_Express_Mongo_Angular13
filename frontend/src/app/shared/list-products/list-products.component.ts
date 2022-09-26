import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../core'

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  products$?: Product[]

  constructor(
    private ProductService: ProductService
  ) { }

  ngOnInit(): void {
    this.get_products();
  }

  get_products(): void {
    if (this.ProductService.products.length == 0) {
      this.ProductService.all_products().subscribe({
        next: data => this.ProductService.products = data,
        error: e => console.error(e)
      });
    }
    this.ProductService.products$.subscribe({
      next: data => this.products$ = data,
      error: e => console.error(e)
    });
  }//get_products
}//class
