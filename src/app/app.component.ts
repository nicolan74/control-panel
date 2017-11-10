// tslint:disable:max-line-length
import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SearchProductService } from './search-product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'control-panel';

  products: Product[];
  // link = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=';

  http: Http;

  constructor(
    http: Http,
    private searchProductService: SearchProductService

  ) {
    this.http = http;
  }

  // performSearch(searchParam): void {
  //   console.log(`User entered: ${searchParam.value}`);

  //   this.searchProductService.searchProducts(searchParam.value).subscribe(products => {
  //     this.products = products;
  //     console.log('THIS PRODUCTS ', this.products);
  //   },
  //     errMsg => {
  //       console.log('SEARCH ERROR MESSAGE', errMsg);
  //     },
  //     () => {

  //       console.log('SEARCH COMPLETE');
  //     }
  //   );
  // }

}
