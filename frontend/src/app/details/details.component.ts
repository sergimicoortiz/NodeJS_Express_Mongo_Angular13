import { Component, Input, OnInit, Output } from '@angular/core';
import { ProductService, Product } from '../core';
import { ActivatedRoute } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  product?: Product;
  picture_product: String[] = [];
  faShoppingCart = faShoppingCart;

  constructor(
    private ProductService: ProductService,
    private ActivatedRoute: ActivatedRoute,
    private Router: Router
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    const slug: any = this.ActivatedRoute.snapshot.paramMap.get('slug');
    if (this.ProductService.product.slug === slug) {
      this.product = this.ProductService.product;
    } else {
      this.ProductService.get_product(slug).subscribe({
        next: data => this.ProductService.product = data,
        error: e => console.error(e)
      });
    }

    this.ProductService.product$.subscribe({
      next: data => { this.product = data, this.picture_product = data.picture },
      error: e => console.error(e)
    })
  }
  redirectOwner(){
    this.Router.navigate([`/profile/${this.product?.owner.username}`]);
  }
}//class
