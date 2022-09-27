import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

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
  }

  get(id: String): Observable<Category> {
    return this.http.get<Category>(`${baseUrl}/${id}`);
  }

  create(data: Category): Observable<Category> {
    return this.http.post<Category>(baseUrl, data);
  }

  update(id: String, data: Category): Observable<Category> {
    return this.http.put<Category>(`${baseUrl}/${id}`, data);
  }

  delete(id: String): Observable<Category> {
    return this.http.delete<Category>(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<Category> {
    return this.http.delete<Category>(removeAllUrl);
  }

  getCarousel(): Observable<Category[]> {
    return this.http.get<Category[]>(carouselUrl);
  }
}