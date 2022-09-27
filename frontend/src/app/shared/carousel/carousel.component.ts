import { Component, Input } from '@angular/core';
import { Category } from '../../core'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {

  @Input() category: Category[] = [];
  @Input() indicators = true;

  selectIndex = 0;

  selectImage(index: number): void {
    this.selectIndex = index;
  }
}
