import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../models';
import { PaginateProduct } from '../models';

const URL_BASE = 'http://localhost:3001/api'
const URL = `${URL_BASE}/products`;
const URL_DETAILS = `${URL_BASE}/product`;
const products_popular_url = `${URL_BASE}/products_popular`;


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private productsList = new BehaviorSubject<Product[]>([]);
  readonly products$ = this.productsList.asObservable();

  private CurrentProduct = new BehaviorSubject<Product | any>({});
  readonly product$ = this.CurrentProduct.asObservable();

  constructor(private http: HttpClient) { }

  get products(): Product[] {
    return this.productsList.getValue();
  }

  set products(data: Product[]) {
    this.productsList.next(data);
  }

  get product(): Product {
    return this.CurrentProduct.getValue();
  }

  set product(data: Product | any) {
    this.CurrentProduct.next(data);
  }

  all_products(params: any, category_slug: String): Observable<PaginateProduct> {
    return this.http.get<PaginateProduct>(`${URL}/${category_slug}`, { params });
  }

  all_products_popular(params: any): Observable<Product[]> {
    return this.http.get<Product[]>(products_popular_url, { params });
  }

  get_product(id: String): Observable<Product> {
    return this.http.get<Product>(`${URL_DETAILS}/${id}`);
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