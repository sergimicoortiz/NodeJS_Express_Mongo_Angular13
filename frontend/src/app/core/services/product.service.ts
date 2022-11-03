import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../models';
import { PaginateProduct } from '../models';
import { environment } from 'src/environments/environment.prod';

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
    return this.http.get<PaginateProduct>(`${environment.PRODUCTS_BASE}/${category_slug}`, { params });
  }//all_products

  all_products_like(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.BASE_URL}/user/likes`);
  }//all_products_like

  all_products_user(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.BASE_URL}/user/products`);
  }//all_products_user

  all_products_popular(params: any): Observable<Product[]> {
    return this.http.get<Product[]>(environment.PRODUCTS_POPULAR, { params });
  }//all_products_popular

  get_product(id: String): Observable<Product> {
    return this.http.get<Product>(`${environment.PRODUCT_BASE}/${id}`);
  }//get_product

  like(id: String): Observable<any> {
    return this.http.post(`${environment.PRODUCT_BASE}/${id}/like`, {})
  }

  unlike(id: String): Observable<any> {
    return this.http.delete(`${environment.PRODUCT_BASE}/${id}/unlike`)
  }
}//class