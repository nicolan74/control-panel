import { Component, OnInit, ViewEncapsulation, DoCheck } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


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
  IS_DETAIL_PAGE = false;
  ID: number;

  PRODUCT_DETAIL_INPUT_IS_EMPTY: boolean;
  DISABLE_CONFIRM_BTN = true;

  confirmClicked = false;


  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
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

    /** IL VALORE E' PASSATO DA NOTIFICATION SERVICE A CUI E' PASSATO DA PRODUCT DETAIL */
    this.PRODUCT_DETAIL_INPUT_IS_EMPTY = this.notificationService.inputIsEmpty;
    console.log('TOOLBAR COMP -> PRODUCT_DETAIL_INPUT_IS_EMPTY: ', this.PRODUCT_DETAIL_INPUT_IS_EMPTY);

    this.confirmClicked = this.notificationService.confirmIsClicked;
    console.log('TOOLBAR COMP -> this.confirmClicked : ', this.confirmClicked);

    if (this.PRODUCT_DETAIL_INPUT_IS_EMPTY === false) {

      this.DISABLE_CONFIRM_BTN = false;

    } else {

      this.DISABLE_CONFIRM_BTN = true;

    }

    if (this.router.url === '/products') {

      this.IS_PRODUCT_PAGE = true;
      console.log('IDENTIFICATA PAGINA PRODOTTI in ngDoCheck: ', this.IS_PRODUCT_PAGE);

    } else if (this.router.url !== '/products') {

      this.IS_PRODUCT_PAGE = false;
      console.log('IDENTIFICATA PAGINA PRODOTTI in ngDoCheck: ', this.IS_PRODUCT_PAGE);

    }


    // if (this.router.url === '/detail') {
    if (this.router.url.indexOf('/detail') !== -1) {


      this.IS_DETAIL_PAGE = true;
      console.log('IDENTIFICATA PAGINA DETTAGLIO PRODOTTO in ngDoCheck: ', this.IS_DETAIL_PAGE);

      // } else if (this.router.url !== '/detail') {
    } else if (this.router.url.indexOf('/detail') === -1) {
      this.IS_DETAIL_PAGE = false;
      console.log('IDENTIFICATA PAGINA DETTAGLIO PRODOTTO in ngDoCheck: ', this.IS_DETAIL_PAGE);


    }

  }

  confirmData(isClicked) {
    // this.router.navigate(['send', {term: this.notificationTypeSelected,  }]);
    this.confirmClicked = true;
    this.notificationService.getIsConfirmClicked(true);

  }
  annulConfirmData(isClicked) {
    this.confirmClicked = false;
    this.notificationService.getIsConfirmClicked(false);
  }

  goToselectedOptionDetailProduct() {

    this.router.navigate(['/detail/' + this.selectedProductId]);
    console.log('STO CHIAMANDO goToselectedOption IN TOOLBAR COMP ');

  }

  goToselectedOption() {
    if (this.notificationTypeSelected === 'Messaggio + link a contenuto') {
      this.router.navigate(['/products']);

      if (this.IS_PRODUCT_PAGE) {
        this.router.navigate(['/detail/' + this.selectedProductId]);
      }

    } else if (this.notificationTypeSelected === 'Messaggio + link a pagina web') {
      this.router.navigate(['/notification', { new: 'message+url' }]);

    } else if (this.notificationTypeSelected === 'Solo messaggio') {
      this.router.navigate(['/notification', { new: 'message' }]);
    }
  }

  goBack(): void {
    this.location.back();
    this.confirmClicked = false;
    this.notificationService.getIsConfirmClicked(false);
  }


}
