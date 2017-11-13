import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SearchProductService } from '../search-product.service';
import { Product } from '../../models/product';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NotificationService } from '../notification.service';

import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {
  products: Product[];
  originalProducts: Product[];
  selectedProduct: Product;
  subscription: Subscription;
  currentTerm: string;

  // http: Http;
  results: Object;
  searchTerm$ = new Subject<string>();

  constructor(
    private searchProductService: SearchProductService,
    private notificationService: NotificationService,
    private http: Http,
  ) { }

  ngOnInit() {
    this.searchProductService.loadOriginalProducts().subscribe(products => {
      this.products = products;
      this.originalProducts = products;
      console.log('THIS ORIGINAL PRODUCTS ', this.originalProducts);
    });
  }

  search(searchParam) {
  // performSearch(searchParam): void {
    // console.log(`User entered: ${searchParam.value}`);
    console.log(`User entered:`, searchParam.target.value);
    // const term = searchParam.value;
    const term = searchParam.target.value;

    if (term.trim() === '' || term.trim().length < 3) {
      // Load cached products
      this.products = this.originalProducts;

    } else {
      console.log('Sto cercando ', term);
      // this.resuluOfSearch = true
      /**
       * memorizzo la subscription nelle proprietà (vedi sopra)
       * se la subscription esiste vuol dire che sono stati gia digitati 3 caratteri ed è partita la ricerca
       * quindi al nuovo digit viene 'unsuscribe' la precedente ed eseguita la nuova
       */
      if (this.subscription) {
        this.subscription.unsubscribe();
        console.log('Annullata richiesta x il term ', this.currentTerm);
      }

      this.searchProductService.searchProducts(term).subscribe(products => {
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
  }


  onSelect(product: Product): void {
    this.selectedProduct = product;
    console.log('Selected Product - OBJECT ', this.selectedProduct);
    console.log('Selected Product - ID ', this.selectedProduct.id);
    console.log('Selected Product - NAME ', this.selectedProduct.name);

  }

  sendNotification(message) {
    console.log(`Massage entered by user: ${message.value}`);
    // const headers = new Headers();
    // headers.append('Content-type', 'application/json');
    // headers.append('Authorization', 'Basic NzY1YjlhODUtNTc0Mi00ZmE3LWJjOGUtMzUxZTdjYmFhZTgw');
    // const options = new RequestOptions({ headers: headers });

    // const body = {
    //   'app_id': 'ad8c202b-1223-494c-b7ea-3805a783cd33',
    //   'contents': { 'en': `${message.value}` },
    //   'included_segments': ['All'],
    //   'data': { 'id': `${this.selectedProduct.id}` }
    // };

    // console.log('POST REQUEST ', body);
    // this.http.post('https://onesignal.com/api/v1/notifications', JSON.stringify(body), options)
    //   .map(res => res.json())
    //   .subscribe(data => {
    //     console.log('--->RESPONSE ', data);
    //   });

    this.notificationService.oneSignalNotification(`${message.value}`, `${this.selectedProduct.id}`);
  }

}
