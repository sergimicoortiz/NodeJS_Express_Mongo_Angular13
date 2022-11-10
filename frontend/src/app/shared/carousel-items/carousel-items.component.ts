import { Component, OnInit } from '@angular/core';
import { CategoryService, Category, ProductService } from '../../core'

@Component({
  selector: 'app-carousel-items',
  templateUrl: './carousel-items.component.html',
  styleUrls: ['./carousel-items.component.scss']
})
export class CarouselItemsComponent implements OnInit {

  picture_carousel: Category[] = [];
  

  constructor(
    private carousel_service: CategoryService,
  ) { }

  ngOnInit(): void {
    this.showCategorys();
  }

  showCategorys() {
    this.carousel_service.getCarousel().subscribe((data) => {
      this.picture_carousel = data;
    })
  }
}
