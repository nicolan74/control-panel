// tslint:disable:max-line-length
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Product } from '../models/product';

@Injectable()
export class SearchProductService {
  http: Http;
  constructor(
    http: Http
  ) {
    this.http = http;
  }



  searchProducts(searchParam: string): Observable<Array<Product>> {
    const url = `https://test.eurofoodservice.it/api/products?output_format=JSON&display=[id,%20name,%20id_default_image,%20price,%20description]&filter[name]=[${searchParam}]%25&ws_key=DDRSMHTSBZPQME7P7WFRFNXB29FGEU6C`;
    console.log('urlFor_searchProducts ', url);
    return this.http
    .get(`${url}`)
    .map(res => <Product[]>(res.json().products));
  }
}
