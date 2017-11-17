import { Component, OnInit, ViewEncapsulation, DoCheck } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit, DoCheck {
  notificationTypeSelected: string;
  selectedProductId: number;

  IS_PRODUCT_PAGE = false;

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    // this.router.url === '/products';
    // if (this.router.url === '/products') {
    //   console.log('IDENTIFICATA PAGINA PRODOTTI');
    //   this.IS_PRODUCT_PAGE = true;
    // }

  }

  ngDoCheck() {
    this.notificationTypeSelected = this.notificationService.notificationTypeSelected;
    console.log('TOOLBAR COMP -> TIPO NOTIFICA SELEZIONATA: ', this.notificationTypeSelected);

    this.selectedProductId = this.notificationService.selectedProductId;
    console.log('TOOLBAR COMP -> ID PRODOTTO SELEZIONATO: ', this.selectedProductId);


    if (this.router.url === '/products') {
      console.log('IDENTIFICATA PAGINA PRODOTTI');
      this.IS_PRODUCT_PAGE = true;
      console.log('IS PRODUCT PAGE ', this.IS_PRODUCT_PAGE);
    }
  }

  goToselectedOption() {
    if (this.notificationTypeSelected === 'Messaggio + link a contenuto') {
      this.router.navigate(['/products']);
      
      if (this.IS_PRODUCT_PAGE) {
        this.router.navigate(['/detail/' + this.selectedProductId ]);
      }

    } else if (this.notificationTypeSelected === 'Messaggio + link a pagina web') {
      this.router.navigate(['/notification', { new: 'message+url' }]);

    } else if (this.notificationTypeSelected === 'Solo messaggio') {
      this.router.navigate(['/notification', { new: 'message' }]);
    }
  }

  goBack(): void {
    this.location.back();
  }


}
