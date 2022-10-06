import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core';

@Component({
  selector: 'app-card-products',
  templateUrl: './card-products.component.html',
  styleUrls: ['./card-products.component.css']
})
export class CardProductsComponent implements OnInit {

  @Input() product?: Product;

  constructor(
    private Router: Router,
    private ProductService: ProductService
  ) { }

  ngOnInit(): void {
  }

  redirect() {
    this.ProductService.product = this.product;
    this.Router.navigate([`/details/${this.product?.slug}`]);
  }//redirect
}//class
