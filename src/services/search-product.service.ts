// tslint:disable:max-line-length
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Product } from '../models/product';
import { BASE_URL, WS_KEY } from '../app/conf';

@Injectable()
export class SearchProductService {
  http: Http;

  constructor(
    http: Http
  ) {
    this.http = http;
  }



  searchProducts(searchParam: string): Observable<Array<Product>> {
    // const url = `https://test.eurofoodservice.it/api/products?output_format=JSON&display=[id,%20name,%20id_default_image,%20price,%20description]&filter[name]=[${searchParam}]%25&ws_key=DDRSMHTSBZPQME7P7WFRFNXB29FGEU6C`;
    const url = `${BASE_URL}/products?output_format=JSON&display=full&filter[name]=%25[${searchParam}]%25&filter[active]=1&ws_key=${WS_KEY}`;
    console.log('urlFor_searchProducts ', url);
    return this.http
      .get(`${url}`)
      .map(res => <Product[]>(res.json().products));
  }

  loadOriginalProducts(): Observable<Product[]> {
    const url = `${BASE_URL}/products?output_format=JSON&display=full&filter[id]=[1,10]&filter[active]=1&ws_key=${WS_KEY}`;
    console.log('url load original product in search-page ', url);
    return this.http
      .get(`${url}`)
      .map(res => <Product[]>res.json().products);
  }

  loadProductDetails(id: number): Observable<Product> {
    const url = `${BASE_URL}/products?output_format=JSON&display=full&filter[id]=[${id}]&ws_key=${WS_KEY}`;
    console.log('urlFor_loadProductDetails ', url);
    return this.http
      .get(`${url}`)
      .map(res => <Product>(res.json().products[0]));
  }
}
