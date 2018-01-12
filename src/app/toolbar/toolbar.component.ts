// tslint:disable:max-line-length
import { Component, OnInit, ViewEncapsulation, DoCheck, ViewChild, AfterViewInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { NavigationService } from '../../services/navigation.service';

import { ONESIGNAL_BASE_URL, ONESIGNAL_EUROFOOD_APP_ID  } from '../conf';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit, DoCheck, AfterViewInit {
  notificationTypeSelected: string;
  selectedProductId: number;
  audienceSelected: string;

  IS_PRODUCT_PAGE = false;
  IS_DETAIL_PAGE = false;
  IS_DASHBOARD_PAGE = false;
  IS_NOTIFICATION_PAGE = false;
  IS_LOGIN_PAGE = false;
  ID: number;

  // PRODUCT_DETAIL_INPUT_LENGHT: any;
  // NOTIFICATION_MSG_INPUT_LENGHT: any;

  MESSAGE_LENGHT: any;

  DISABLE_CONFIRM_BTN = true;
  DISABLE_NEXT_BTN = true;

  confirmClicked = false;
  IS_VISIBLE_BACK_BTN = true;
  IS_VISIBLE_CONFIRM_BTN = false;

  // HAS_INVALID_URL = true;
  HAS_VALID_URL = false;
  LOGGED_USER_EMAIL: any;
  LOGGED_USER_EMAIL_TRUNCATE: any;

  URL_VS_ONESIGNAL_TEST_USERS = ONESIGNAL_BASE_URL + ONESIGNAL_EUROFOOD_APP_ID + '/players?test_users=true';
  URL_VS_ONESIGNAL_ALL_USERS = ONESIGNAL_BASE_URL + ONESIGNAL_EUROFOOD_APP_ID + '/players';
  URL_VS_ONESIGNAL_SENT_MESSAGES = ONESIGNAL_BASE_URL + ONESIGNAL_EUROFOOD_APP_ID + '/notifications';

  @ViewChild('input_msg') input_msg;

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService,
  ) { }

  ngOnInit() {
    // this.router.url === '/products';
    // if (this.router.url === '/products') {
    //   console.log('IDENTIFICATA PAGINA PRODOTTI');
    //   this.IS_PRODUCT_PAGE = true;
    // }

  }
  ngAfterViewInit() {


  }

  ngDoCheck() {
    /**
     *  I determine if the current route-request is part of a page refresh.
     *  this.router.navigated) è false se viene fatto il refresh della pagina
     *  Risolve (reindirizzando alla dashboard): se la pagina viene aggiornata this.notificationTypeSelected = undefined
     *  questo non permette di determinare il tipo di notifica selezionata dall'utente e il 'salto' delle condizioni che
     *  abilitano il pulsante CONFERMA (vedi sotto (A) e (B))
     */
    console.log('======== ====== ====== >>> ROUTER NAVIGATED', this.router.navigated);
    if (!this.router.navigated) {
      this.router.navigate(['/dashboard']);
    }

    this.LOGGED_USER_EMAIL = localStorage.getItem('user');
    // console.log('===============================================================');
    // console.log('EMAIL UTENTE LOGGATO ', this.LOGGED_USER_EMAIL);
    // console.log('===============================================================');
    if (this.LOGGED_USER_EMAIL) {
      this.LOGGED_USER_EMAIL_TRUNCATE = this.LOGGED_USER_EMAIL.substring(0, 8) + '...';
      console.log('===============================================================');
      console.log('EMAIL UTENTE LOGGATO TRONCATA', this.LOGGED_USER_EMAIL_TRUNCATE);
      console.log('===============================================================');
    }

    this.notificationService.VALID_URL.subscribe(
      value => {
        console.log('============= 0> VALID URL SUBSCRIPTION (toolbar.com) ', value);
        this.HAS_VALID_URL = value;
      }
    );


    /**
     * DALLA DASHBOARD TRAMITE NAVIGATION SERVICE
     * ** determina il path a cui indirizza goToselectedOption() legato al NEXT
     * ** usato anche nelle condizioni che abilitano/disabilitano il pulsante CONFERMA (vedi sotto (A) e (B))  */
    // this.notificationTypeSelected = this.notificationService.notificationTypeSelected;
    // console.log('======= ===== ==> TOOLBAR COMP -> TIPO NOTIFICA SELEZIONATA: ', this.notificationTypeSelected);
    this.notificationTypeSelected = this.navigationService.NOTIFICATION_TYPE_SELECTED;
    console.log('TOOLBAR COMP -> TIPO NOTIFICA SELEZIONATA: ', this.notificationTypeSelected);

    /**
     * DALLA DASHBOARD TRAMITE NAVIGATION SERVICE
     * ** usato nelle condizioni che abilitano/disabilitano il pulsante CONFERMA (vedi sotto (A) e (B)) */
    this.audienceSelected = this.notificationService.audienceSelected;
    // this.audienceSelected = this.navigationService.AUDIENCE_SELECTED;
    console.log('TOOLBAR COMP -> AUDIENCE SELEZIONATO: ', this.audienceSelected);

    this.selectedProductId = this.notificationService.selectedProductId;
    console.log('TOOLBAR COMP -> ID PRODOTTO SELEZIONATO: ', this.selectedProductId);


    /** IL VALORE E' PASSATO DA NOTIFICATION SERVICE A CUI E' PASSATO DA PRODUCT DETAIL */
    this.MESSAGE_LENGHT = this.notificationService.inputMsgLengt;
    console.log('! ! ! -> TOOLBAR COMP -> PRODUCT_DETAIL_INPUT_MSG_LENGHT: ', this.MESSAGE_LENGHT);

    // this.NOTIFICATION_MSG_INPUT_LENGHT = this.notificationService.inputMsgLengt;
    // console.log('! ! ! -> TOOLBAR COMP -> NOTIFICATION_MSG_INPUT_LENGHT: ', this.NOTIFICATION_MSG_INPUT_LENGHT);

    /** e' inizialmente false poi  confirmData(isClicked) - vedi sotto - gli passa true */
    this.confirmClicked = this.notificationService.confirmIsClicked;
    console.log('TOOLBAR COMP -> this.confirmClicked : ', this.confirmClicked);

    // this.HAS_INVALID_URL = this.notificationService.launchUrlIsValid;
    // console.log('TOOLBAR COMP -> HAS_INVALID_URL : ', this.HAS_INVALID_URL);


    /** (A)
     *  SE OPZIONE SELEZIONATA 'Messaggio + link a pagina web'
     *  IL PULSANTE CONFERMA E' DISABILITATO SE
     *  - IL CAMPO INPUT DEL MESSAGGIO NON HA + DI DUE DIGIT
     *  - NON RISULTA SELEZIONATA L'AUDIENCE (ad esempio viene fatto un refresh della pagina /notification
     *    e viene perso il valore inizialmente assegnato ad AUDIENCE che diviene undefined)
     *  - L'URL INSERITO NON E' VALIDO */
    if (this.notificationTypeSelected === 'Messaggio + link a pagina web') {
      if ((this.MESSAGE_LENGHT >= 2) && (this.audienceSelected !== undefined) && (this.HAS_VALID_URL === true)
      ) {
        this.DISABLE_CONFIRM_BTN = false;
        console.log(' !! TOOLBAR DISABLE_CONFIRM_BTN ', this.DISABLE_CONFIRM_BTN);
      } else {
        this.DISABLE_CONFIRM_BTN = true;
        console.log(' !! TOOLBAR DISABLE_CONFIRM_BTN ', this.DISABLE_CONFIRM_BTN);
      }
    }

    /** (B)
     *  SE OPZIONE SELEZIONATA 'Solo messaggio' o 'Messaggio + link a contenuto'
     *  IL PULSANTE CONFERMA E' DISABILITATO SE
     *  - IL CAMPO INPUT DEL MESSAGGIO NON HA + DI DUE DIGIT
     *  - NON RISULTA SELEZIONATA L'AUDIENCE (ad esempio viene fatto un refresh della pagina /notification
     *    e viene perso il valore inizialmente assegnato ad AUDIENCE che diviene undefined) */
    if ((this.notificationTypeSelected === 'Solo messaggio') || (this.notificationTypeSelected === 'Messaggio + link a contenuto')) {

      if ((this.MESSAGE_LENGHT >= 2) && (this.audienceSelected !== undefined)) {
        this.DISABLE_CONFIRM_BTN = false;
        console.log(' !! TOOLBAR DISABLE_CONFIRM_BTN ', this.DISABLE_CONFIRM_BTN);
      } else {
        this.DISABLE_CONFIRM_BTN = true;
        console.log(' !! TOOLBAR DISABLE_CONFIRM_BTN ', this.DISABLE_CONFIRM_BTN);
      }
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
     * INDIVIDUO SE LA PAGINA CORRENTE E' LA MessageAndContentDataSelection
     * LO USO NEL TOOLBAR TEMPLATE PER NASCONDERE IL BTN NEXT INIZIALE E PER VISUALIZZARE
     * UNO CUSTOM CHE PORTA A PRODUCT DETAIL (usato nel wf nessaggio + link al contenuto) */
    if (this.router.url === '/contentselection') {
      this.IS_PRODUCT_PAGE = true;
      console.log('IDENTIFICATA PAGINA PRODOTTI in ngDoCheck: ', this.IS_PRODUCT_PAGE);
    } else if (this.router.url !== '/contentselection') {
      this.IS_PRODUCT_PAGE = false;
      console.log('IDENTIFICATA PAGINA PRODOTTI in ngDoCheck: ', this.IS_PRODUCT_PAGE);
    }

    /** INDIVIDUO SE LA PAGINA CORRENTE E' LA LOGIN  */
    if (this.router.url === '/login') {
      this.IS_LOGIN_PAGE = true;
    } else {
      this.IS_LOGIN_PAGE = false;
    }

    /** INDIVIDUO SE LA PAGINA CORRENTE E' LA DASHBOARD  */
    if (this.router.url === '/dashboard') {
      this.IS_DASHBOARD_PAGE = true;
    } else {
      this.IS_DASHBOARD_PAGE = false;
    }

    /**
     * || (this.IS_LOGIN_PAGE === true)
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
     * INDIVIDUO SE LA PAGINA CORRENTE E' LA NOTIFICATION NASCONDO IL PULSANTE NEXT (QUELLO INIZIALE) */
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

    // if (this.notificationTypeSelected === 'Messaggio + link a contenuto') {
    //   if (this.HAS_INVALID_URL === true) {
    //     this.DISABLE_CONFIRM_BTN = true;
    //   } else {
    //     this.DISABLE_CONFIRM_BTN = false;
    //   }
    // }

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
      this.router.navigate(['/contentselection']);

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

  logout() {
    this.authenticationService.logout();
  }


}
