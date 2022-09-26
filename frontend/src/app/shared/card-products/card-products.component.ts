import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/core';

@Component({
  selector: 'app-card-products',
  templateUrl: './card-products.component.html',
  styleUrls: ['./card-products.component.css']
})
export class CardProductsComponent implements OnInit {

  @Input() product?: Product;

  onstructor() { }

  ngOnInit(): void {
  }

}
