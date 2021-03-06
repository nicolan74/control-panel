import { Component, OnInit, ViewEncapsulation, DoCheck } from '@angular/core';
import { SearchProductService } from '../../services/search-product.service';
import { Product } from '../../models/product';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NotificationService } from '../../services/notification.service';

import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { AuthenticationService } from '../../services/authentication.service';
import { BASE_URL, WS_KEY } from '../conf';

@Component({
  selector: 'app-message-and-content-data-selection',
  templateUrl: './message-and-content-data-selection.component.html',
  styleUrls: ['./message-and-content-data-selection.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessageAndContentDataSelectionComponent implements OnInit, DoCheck {
  products: Product[];
  originalProducts: Product[];
  selectedProduct: Product;
  subscription: Subscription;
  currentTerm: string;

  selectedProductId: number;

  // http: Http;
  results: Object;
  searchTerm$ = new Subject<string>();

  PRESTASHOP_BASE_URL = BASE_URL;
  PRESTASHOP_WS_KEY = WS_KEY;

  constructor(
    private searchProductService: SearchProductService,
    private notificationService: NotificationService,
    private http: Http,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.searchProductService.loadOriginalProducts().subscribe(products => {
      this.products = products;
      this.originalProducts = products;
      console.log('THIS ORIGINAL PRODUCTS ', this.originalProducts);
    });

    this.authenticationService.checkCredentials();
  }

  ngDoCheck() {
    /**
     *  ENTRANDO NELLA LISTA DEI PRODOTTI IL BTN NEXT E' DISABILITATO SE NESSUN PRODOTTO E' SELEZIONATO
     *  PERCHè IN QUESTO COMPONENTE SULL'ONSELECT VIENE INVIATO L'ID DEL PRODOTTO SELEZIONATO AL COMP. TOOLBAR
     *  (TRAMITE IL NOTIFICATION SERVICE) CHE NE GESTISCE IL DISABLE/ENABLE TRAMITE IL GET CHE FA NEL MERODO ngDoCheck
     *  EFFETTUANDO IL BACK IN QUESTO COMP IL VALORE DELL'ID IN ngDoCheck DEL COMP TOOLBAR NON VIENE AGGIORNATO
     *  (DOVREBBE ESSERE undefined IN MODO CHE IL PULSANTE NEXT RISULTI NUOVAMENTE DISABILITATO)
     *  E RIMANE QUELLO INIZIALMENTE SELEZIONATO. SETTANDOLO ANCHE DAL METODO ngDoCheck DI QUESTO COMPONENTE RISOLVE IL PROBLEMA  */
    this.notificationService.getSelectedProduct(this.selectedProductId);
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
    this.selectedProductId = this.selectedProduct.id;
    console.log('Selected Product - OBJECT ', this.selectedProduct);
    console.log('Selected Product - ID ', this.selectedProduct.id);
    console.log('Selected Product - NAME ', this.selectedProduct.name);
    console.log('Selected Product - ID DEFAULT IMAGE ', this.selectedProduct.id_default_image);

    this.notificationService.getSelectedProduct(this.selectedProduct.id);

    // for (let i = 0; i < this.products.length; i++) {

    //   if (this.products[i].id === this.selectedProduct.id) {

    //     console.log('ID PRODOTTO SELEZIONATO', this.products[i].id);
    //     console.log('PRODOTTO SELEZIONATO', this.products[i]);
    //     console.log('THIS PRODUCTS ', this.products);
    //     this.products.unshift(this.selectedProduct);

    //   }
    // }

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

    // this.notificationService.oneSignalNotificationLinkedToProduct(`${message.value}`, `${this.selectedProduct.id}`);
  }

}
