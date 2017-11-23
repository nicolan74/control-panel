// tslint:disable:max-line-length
import { Component, OnInit, ViewEncapsulation, DoCheck, ViewChild } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
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
  audienceSelected: string;

  IS_PRODUCT_PAGE = false;
  IS_DETAIL_PAGE = false;
  IS_DASHBOARD_PAGE = false;
  IS_NOTIFICATION_PAGE = false;
  ID: number;

  PRODUCT_DETAIL_INPUT_LENGHT: any;
  NOTIFICATION_MSG_INPUT_LENGHT: any;

  DISABLE_CONFIRM_BTN = true;
  DISABLE_NEXT_BTN = true;

  confirmClicked = false;
  IS_VISIBLE_BACK_BTN = true;
  IS_VISIBLE_CONFIRM_BTN = false;

  @ViewChild('input_msg') input_msg;

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

    this.audienceSelected = this.notificationService.audienceSelected;
    console.log('TOOLBAR COMP -> AUDIENCE SELEZIONATO: ', this.audienceSelected);

    /** IL VALORE E' PASSATO DA NOTIFICATION SERVICE A CUI E' PASSATO DA PRODUCT DETAIL */
    this.PRODUCT_DETAIL_INPUT_LENGHT = this.notificationService.inputMsgLengt;
    console.log('! ! ! -> TOOLBAR COMP -> PRODUCT_DETAIL_INPUT_MSG_LENGHT: ', this.PRODUCT_DETAIL_INPUT_LENGHT);

    this.NOTIFICATION_MSG_INPUT_LENGHT = this.notificationService.inputMsgLengt;
    console.log('! ! ! -> TOOLBAR COMP -> NOTIFICATION_MSG_INPUT_LENGHT: ', this.NOTIFICATION_MSG_INPUT_LENGHT);

    /** e' inizialmente false poi  confirmData(isClicked) - vedi sotto - gli passa true */
    this.confirmClicked = this.notificationService.confirmIsClicked;
    console.log('TOOLBAR COMP -> this.confirmClicked : ', this.confirmClicked);

    /**
     *  IL PULSANTE CONFERMA E' DISABILITATO SE IL CAMPO INPUT DEL MESSAGGIO NON HA + DI DUE DIGIT
     *  O SE NON RISULTA SELEZIONATA L'AUDIENCE (SE AD ESEMPIO VIENE FATTO UN REFRESH SULLA PAGINA PRODUCT DETAIL
     *  SI PERDE IL VALORE INIZIALMENTE ASSEGNATO AD AUDIENCE CHE DIVIENE undefined) */
    if ((this.PRODUCT_DETAIL_INPUT_LENGHT >= 2) && (this.audienceSelected !== undefined)) {
      this.DISABLE_CONFIRM_BTN = false;
      console.log(' !! TOOLBAR DISABLE_CONFIRM_BTN ', this.DISABLE_CONFIRM_BTN);
    } else {
      this.DISABLE_CONFIRM_BTN = true;
      console.log(' !! TOOLBAR DISABLE_CONFIRM_BTN ', this.DISABLE_CONFIRM_BTN);
    }

    /**
     * IL PULSANTE NEXT* 'ALTERNATIVO' (goToselectedOptionDetailProduct() CHE APRE IL DETTAGLIO PRODOTTO
     * E' DISABILITATO SE NON E' SELEZIONATO NESSUN PRODOTTO (usato nel wf nessaggio + link al contenuto) */
    if (this.selectedProductId === undefined) {
      this.DISABLE_NEXT_BTN = true;
    } else {
      this.DISABLE_NEXT_BTN = false;
    }

    /**
     * INDIVIDUO SE LA PAGINA CORRENTE E' LA PRODUCT
     * LO USO NEL TOOLBAR TEMPLATE PER NASCONDERE IL BTN NEXT INIZIALE E PER VISUALIZZARE
     * UNO CUSTOM CHE PORTA A PRODUCT DETAIL (usato nel wf nessaggio + link al contenuto) */
    if (this.router.url === '/products') {
      this.IS_PRODUCT_PAGE = true;
      console.log('IDENTIFICATA PAGINA PRODOTTI in ngDoCheck: ', this.IS_PRODUCT_PAGE);
    } else if (this.router.url !== '/products') {
      this.IS_PRODUCT_PAGE = false;
      console.log('IDENTIFICATA PAGINA PRODOTTI in ngDoCheck: ', this.IS_PRODUCT_PAGE);
    }

    /** INDIVIDUO SE LA PAGINA CORRENTE E' LA DASHBOARD  */
    if (this.router.url === '/dashboard') {
      this.IS_DASHBOARD_PAGE = true;
    } else {
      this.IS_DASHBOARD_PAGE = false;
    }

    /**
     * *** *** BACK_BTN *** ***
     * SE LA PAGINA CORRENTE E' LA DASHBOARD O E' STATO CLICCATO IL BTN CONFERMA NON VISUALIZZO IL BTN BACK */
    if ((this.IS_DASHBOARD_PAGE === true) || (this.confirmClicked === true)) {
      this.IS_VISIBLE_BACK_BTN = false;
      console.log('IS_DASHBOARD_PAGE -> :' + this.IS_DASHBOARD_PAGE + ' | CONFIRM IS Clicked -> : ' + this.confirmClicked + ' | E VISILE BACK BTN -> : ' + this.IS_VISIBLE_BACK_BTN);
    } else {
      this.IS_VISIBLE_BACK_BTN = true;
      console.log('IS_DASHBOARD_PAGE -> :' + this.IS_DASHBOARD_PAGE + ' | CONFIRM IS Clicked -> : ' + this.confirmClicked + ' | E VISILE BACK BTN -> : ' + this.IS_VISIBLE_BACK_BTN);
    }

    /**
     * SE LA PAGINA CORRENTE E' PRODUCT DETAILS INVECE CHE NEXT* (*IL NEXT ALTERNATIVO)
     * VISUALIZZO IL PULSANTE CONFERMA (confirmData(isClicked)
     * E IL PULSANTE ANNULLA annulConfirmData */
    if (this.router.url.indexOf('/detail') !== -1) {
      this.IS_DETAIL_PAGE = true;
      console.log('IDENTIFICATA PAGINA DETTAGLIO PRODOTTO in ngDoCheck: ', this.IS_DETAIL_PAGE);
    } else if (this.router.url.indexOf('/detail') === -1) {
      this.IS_DETAIL_PAGE = false;
      console.log('IDENTIFICATA PAGINA DETTAGLIO PRODOTTO in ngDoCheck: ', this.IS_DETAIL_PAGE);
    }

    /**
     * INDIVIDUO SE LA PAGINA CORRENTE E' LA NOTIFICATION NASCONDO IL PULSENTE NEXT (QUELLO INIZIALE) */
      if (this.router.url.indexOf('/notification') !== -1) {
      this.IS_NOTIFICATION_PAGE = true;
      console.log('IDENTIFICATA PAGINA NOTIFICATION in TOOLBAR C. (ngDoCheck): ', this.IS_NOTIFICATION_PAGE);
    } else if (this.router.url.indexOf('/notification') === -1) {
      this.IS_NOTIFICATION_PAGE = false;
      console.log('IDENTIFICATA PAGINA NOTIFICATION in TOOLBAR C. (ngDoCheck): ', this.IS_NOTIFICATION_PAGE);

    }

    /**
     * SE LA PAGINA CORRENTE E' LA NOTIFICATION O PRODUCT-DETAIL PAGE
     * VISUALIZZA IL PULSANTE CONFERMA * workflow: TUTTI */
    if ((this.IS_DETAIL_PAGE === true) || (this.IS_NOTIFICATION_PAGE === true)) {
      this.IS_VISIBLE_CONFIRM_BTN = true;
    } else {
      this.IS_VISIBLE_CONFIRM_BTN = false;

    }



  }

  /** SE E' CLICCATO IL BTN CONFERMA VIENE SETTATO A TRUE e PASSATO A NOTIFICATION SERVICE */
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
