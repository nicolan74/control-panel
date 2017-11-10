import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SearchProductService } from '../search-product.service';
import { Product } from '../../models/product';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;

  // http: Http;

  constructor(
    private searchProductService: SearchProductService,
    private http: Http,
  ) { }

  ngOnInit() {
  }

  performSearch(searchParam): void {
    console.log(`User entered: ${searchParam.value}`);

    this.searchProductService.searchProducts(searchParam.value).subscribe(products => {
      this.products = products;
      console.log('THIS PRODUCTS ', this.products);
    },
      errMsg => {
        console.log('SEARCH ERROR MESSAGE', errMsg);
      },
      () => {

        console.log('SEARCH COMPLETE');
      }
    );
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
    // console.log('Selected Product - OBJECT ', this.selectedProduct);
    console.log('Selected Product - ID ', this.selectedProduct.id);
    console.log('Selected Product - NAME ', this.selectedProduct.name);

  }

  sendNotification() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Basic NzY1YjlhODUtNTc0Mi00ZmE3LWJjOGUtMzUxZTdjYmFhZTgw');
    const options = new RequestOptions({ headers: headers });

    const body = {
      'app_id': 'ad8c202b-1223-494c-b7ea-3805a783cd33',
      'contents': { 'en': 'Nikola Test' },
      'included_segments': ['All'],
      'data': { 'id': '623' }
    };

    console.log('POST REQUEST ', body);
    this.http.post('https://onesignal.com/api/v1/notifications', JSON.stringify(body), options)
      .map(res => res.json())
      .subscribe(data => {
        console.log('--->RESPONSE ', data);
      });
  }

}
