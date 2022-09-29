import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../models';
import { PaginateProduct } from '../models';

const URL = 'http://localhost:3001/api/products';


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

  all_products(param: any): Observable<PaginateProduct> {
    return this.http.get<PaginateProduct>(URL, { params: new HttpParams({ fromObject: param }) });
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