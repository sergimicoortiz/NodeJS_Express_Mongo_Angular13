import { Component, OnInit } from '@angular/core';
import { CategoryService, Category, ProductService } from '../../core'

@Component({
  selector: 'app-carousel-items',
  templateUrl: './carousel-items.component.html',
  styleUrls: ['./carousel-items.component.css']
})
export class CarouselItemsComponent implements OnInit {

  picture_carousel: Category[] = [];
  picture_product: String[] = [];

  constructor(
    private carousel_service: CategoryService,
    private ProductService: ProductService
  ) { }

  ngOnInit(): void {
    this.showCategorys();
    this.getProducts();
  }

  showCategorys() {
    this.carousel_service.getCarousel().subscribe((data) => {
      this.picture_carousel = data;
    })
  }

  getProducts() {
    if (this.ProductService.product.picture) {
      this.ProductService.product$.subscribe({
        next: data => this.picture_product = data.picture,
        error: e => console.error(e)
      });
    }
  }
}
