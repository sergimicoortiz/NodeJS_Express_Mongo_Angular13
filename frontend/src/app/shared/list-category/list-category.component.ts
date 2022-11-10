import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../../core'

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  category?: Category[];

  constructor(private CategoryService: CategoryService) { }

  ngOnInit(): void {
    this.showCategorys()
  }

  showCategorys() {
    this.CategoryService.getAll().subscribe((data) => {
      this.category = data;
    })
  }
}
