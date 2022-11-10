import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../core'

@Component({
  selector: 'app-profile-likes',
  templateUrl: './profile-likes.component.html',
  styleUrls: ['./profile-likes.component.scss'],
})
export class ProfileLikesComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private ProductService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.ProductService.all_products_like().subscribe({
      next: data => this.products = data,
      error: error => console.error(error)
    });
  }//getProducts

  deleteFromList(slug: String) {
    this.products = this.products.filter(p => p.slug !== slug);
  }

}//class
