import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../core'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor(
    private Router: Router
  ) { }

  @Input() category: Category[] = [];
  @Input() products: String[] = [];
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 3000;

  faArrowAltCircleLeft = faArrowAltCircleLeft;
  faArrowAltCircleRight = faArrowAltCircleRight;

  selectIndex = 0;
  selectIndex_product = 0;

  ngOnInit(): void {
    if (this.autoSlide) {
      this.autoSlideImages();
    }
  }

  autoSlideImages(): void {
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval);
  }

  selectImage(index: number): void {
    this.selectIndex = index;
    this.selectIndex_product = index;
  }

  onPrevClick(): void {
    if (this.selectIndex === 0) {
      this.selectIndex = this.category.length - 1;
    } else {
      this.selectIndex--;
    }
  }

  onNextClick(): void {
    if (this.selectIndex === this.category.length - 1) {
      this.selectIndex = 0;
    } else {
      this.selectIndex++;
    }

    if (this.selectIndex_product === this.products.length - 1) {
      this.selectIndex_product = 0;
    } else {
      this.selectIndex_product++;
    }
  }

  redirect(slug: String): void {
    const filters: any = { category: slug };
    const URL = `/shop/${btoa(JSON.stringify(filters))}`
    this.Router.navigate([URL]);
  }//redirect

}//class
