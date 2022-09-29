import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

const URL = 'http://localhost:3001/api/products';
const products_popular_url = 'http://localhost:3001/api/products_popular';


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private productsList = new BehaviorSubject<Product[]>([]);
  readonly products$ = this.productsList.asObservable();

  constructor(private http: HttpClient) { }

  get products(): Product[] {
    return this.productsList.getValue();
  }

  set products(data: Product[]) {
    this.productsList.next(data);
  }

  all_products(): Observable<Product[]> {
    return this.http.get<Product[]>(URL);
  }

  all_products_popular(params:any): Observable<Product[]> {
    return this.http.get<Product[]>(products_popular_url, { params });
  }

  get_product(id: String): Observable<Product> {
    return this.http.get<Product>(`${URL}/${id}`);
  }

  delete_product(id: String): Observable<Product[]> {
    return this.http.delete<Product[]>(`${URL}/${id}`);
  }

  insert_product(product: Product): Observable<Product[]> {
    return this.http.post<Product[]>(URL, product);
  }

  update_product(product: Product, id: String): Observable<Product[]> {
    return this.http.put<Product[]>(`${URL}/${id}`, product);
  }

  delete_all_products(): Observable<Product[]> {
    return this.http.delete<Product[]>(`${URL}_all`);
  }
}