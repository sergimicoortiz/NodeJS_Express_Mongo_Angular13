import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.CATEGORY_BASE);
  }//getAll

  getCarousel(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.CARUSEL_CATEGORY);
  }//getCarousel
}