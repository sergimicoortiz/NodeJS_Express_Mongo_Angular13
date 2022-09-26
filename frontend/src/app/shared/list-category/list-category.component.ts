import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../../core'

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  constructor(private CategoryService: CategoryService) { }

  ngOnInit(): void {
    this.CategoryService.getAll().subscribe((data) => {
      console.log(data)
    })
  }

}
