import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../core'

@Component({
  selector: 'app-profile-products',
  templateUrl: './profile-products.component.html',
  styleUrls: ['./profile-products.component.css']
})
export class ProfileProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private ProductService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.ProductService.all_products_user().subscribe({
      next: data => this.products = data,
      error: error => console.error(error)
    });
  }//getProducts

}
