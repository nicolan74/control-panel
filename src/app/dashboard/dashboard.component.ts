import { Component, OnInit, ViewEncapsulation, DoCheck, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, DoCheck {
  notificationTypeSelected = 'Messaggio + link a contenuto';
  audienceSelected = 'Invia a tutti';
  // notificationTypeSelected: string
  mobHeight: any;
  mobWidth: any;

  message_lenght = 0;

  notificationOptions = [
    'Messaggio + link a contenuto',
    'Solo messaggio',
    'Messaggio + link a pagina web',
  ];
  audienceOptions = [
    'Invia a tutti',
    'Invia ad utenti test',
  ];

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      console.log('+++ +++ WINDOW < 768 +++ +++ ');
    }
    if (event.target.innerWidth > 768) {
      console.log('+++ +++ WINDOW > 768 +++ +++');
    }
  }


  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService
  ) {
    this.mobHeight = (window.screen.height) + 'px';
    this.mobWidth = (window.screen.width) + 'px';
    console.log('+++ +++ WINDOW Height', this.mobHeight);
    console.log('+++ +++ WINDOW Width', this.mobWidth);
  }

  ngOnInit() {

    /**
     * WORKFLOW: all'entrata nella dashboard e al cambio di selezione (vedi sotto changeNotficationSelection)
     * il tipo di notifica selezionata viene passato al comp NOTIFICATION SERVICE
     * dal notification service viene passato al comp TOOLBAR che in base alla notifica selezionata reindirizza alle pagine:
     *
     *  *** se la selezione è 'Messaggio + link a contenuto' ***
     *      path = /contentselection se la pagina in cui si trova l'utente è la DASHBOARD
     *      path = /detail/ se la pagina in cui si trova l'utente è la quella di selezione del prodotto
     *
     *  *** se la selezione è 'Messaggio + link a pagina web' ***
     *      path = /notification' (comp MessageAndUrlComponent) passando nell URL il parametro new: 'message+url'
     *      il componente MessageAndUrlComponent get il valore assegnato al parametro 'new' con this.route.snapshot.params['new']
     *      visualizzando nel template la sezione <span *ngIf="userSelection == 'message+url'">
     *
     *  *** se la selezione è 'Solo messaggio' ***
     *      path = /notification' (comp MessageAndUrlComponent) passando nell URL il parametro new: 'message'
     *      il componente MessageAndUrlComponent get il valore assegnato al parametro 'new' con this.route.snapshot.params['new']
     *      visualizzando nel template la sezione <span *ngIf="userSelection == 'message'">
     */
    this.notificationService.getNotificationTypeSelected(this.notificationTypeSelected);
    this.notificationService.getAudienceSelected(this.audienceSelected);

    this.authenticationService.checkCredentials();

    /**
     * ANCORA NON LO USO
     */
    // this.notificationService.getOnesignalAppDevices().subscribe(devices => {
    //   console.log('EUROFOOD ONESIGNAL DEVICES ', devices);
    //   for (let i = 0; i < devices.length; i++) {
    //     console.log(devices[i].id);
    //     console.log(devices[i].tags['email']);
    //   }
    // });
  }
  ngDoCheck() {
    // this.notificationService.getAudienceSelected(this.audienceSelected);
    // console.log('-- -- > -- -- > IN DASHBOARD AUDIENCE SELECTED (ngDoCheck)', this.audienceSelected);
    /**
     * QUANDO SI E' NELLA DASHBOARD RIASSEGNO IL VALORE A CONFIRM IS CLICKED
     * EVITA L'ISSUE: AD ESEMPIO SEGUO WF messaggio + link al contenuto CLICCO CONFERMA MA NN INVIO IL MESSAGGIO
     * TORNO IN DASHBOARD E SEGUO IL WF solo messaggio. NELLA PAGINA NOTIFICATION-MESSAGE (alias NOTIFICATION) IL BTN
     * BACK NON COMPARE PERCHE' IL VALORE DI IS CLICLED è ANCORA SETTATO A TRUE */
    this.notificationService.getIsConfirmClicked(false);
    console.log('| | -> DASHBOARD CONFIRM IS CLICKED (ngDoCheck) ', this.notificationService.confirmIsClicked);

    /**
     *  SE SONO IN DASHBOARD SETTO A ZERO LA MESSAGE LENGHT: PUO' ACCADERE CHE
     *  DOPO AVER QUASI TERMINATO IL WF messaggio + link al contenuto L'UTENTE TORNI INDIETRO E SELEZIONI
     *  AD ESEMPIO IL wf solo messaggio. ESSENDOCI IN MEMORIA LA PRECEDENTE LUNGHEZZA DEL MSG VIENE SALTATO LO STEP
     *  CHE PERMETTE DI SETTARE IL MESSAGGIO A CAUSA ANCHE DEL CONFIRM IS CLICKED ANCORA SETTATO A TRUE (RISOLTO COME SOPRA)
     */
    this.notificationService.setMessageLenght(this.message_lenght);
  }
  changeNotficationSelection(notificationTypeSelected) {
    console.log('IN DASHBOARD NOTIFICATION TYPE SELECTED ', this.notificationTypeSelected);
    this.notificationService.getNotificationTypeSelected(this.notificationTypeSelected);
  }

  changeAudienceSelection(audienceSelected) {
    this.notificationService.getAudienceSelected(this.audienceSelected);
    console.log('-- -- > -- -- > IN DASHBOARD AUDIENCE SELECTED (changeAudienceSelection)', this.audienceSelected);
  }


  /**
   * USATO PER IL PULSANTE NEXT NELLA PAGINA DASHBOARD.COMPONENT.HTML
   * ORA SPOSTATO IN TOOLBAR.COMPONENT.TS
   * @param notificatioType
   */
  // selectedOption(notificatioType) {
  //   console.log('DASHBOARD COMP -> TIPO NOTIFICA SELEZIONATA: ', this.notificationTypeSelected);
  //   if (this.notificationTypeSelected === 'Messaggio + link a contenuto') {
  //     this.router.navigate(['/products']);
  //     this.notificationService.notificationTypeSelected = this.notificationTypeSelected;
  //   } else if (this.notificationTypeSelected === 'Messaggio + link a pagina web') {
  //     this.router.navigate(['/notification', { new: 'message+url' }]);

  //   } else if (this.notificationTypeSelected === 'Solo messaggio') {
  //     this.router.navigate(['/notification', { new: 'message' }]);
  //   }
  // }



}
