import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { PaginateProduct } from '../models';

const baseUrl = 'http://localhost:3001/api/category';
const removeAllUrl = 'http://localhost:3001/api/category_all'
const carouselUrl = 'http://localhost:3001/api/carousel/category'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(baseUrl);
  }//getAll

  getCarousel(): Observable<Category[]> {
    return this.http.get<Category[]>(carouselUrl);
  }//getCarousel
}