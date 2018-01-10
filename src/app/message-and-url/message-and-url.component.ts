// tslint:disable:max-line-length
import { Component, OnInit, ViewEncapsulation, DoCheck, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogWindowComponent } from '../dialog-window/dialog-window.component';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-message-and-url',
  templateUrl: './message-and-url.component.html',
  styleUrls: ['./message-and-url.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessageAndUrlComponent implements OnInit, DoCheck {
  userSelection: any;
  notification_message: string;
  message_lenght: number;
  selected_audience: string;
  NO_SELECTED_AUDIENCE = false;
  confirm_is_clicked = false;
  SEND_MSG_IS_CLICKED = false;
  REQUEST_COMPLETE: boolean;
  segment: string;
  // launch_url: string;
  public invalidUrlErrorMsg = '';
  HAS_INVALID_URL = true;

  HAS_PASTED_LAUNCHURL: any;

  launch_url: '';
  form: FormGroup;


  content: any;


  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private location: Location,
    public dialog: MatDialog,
    private router: Router,
    private authenticationService: AuthenticationService,
    public formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      url: ['', Validators.compose([Validators.pattern(/^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?(\#([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?)?$/), Validators.required])],
    });
  }

  ngOnInit() {
    this.getUserSelection();

    this.selected_audience = this.notificationService.audienceSelected;
    console.log('-- -- -- > AUDIENCE SELECTED GET IN NOTIFICATION MSG (ngOnInit)', this.selected_audience);

    if (this.selected_audience === undefined) {
      this.NO_SELECTED_AUDIENCE = true;
      console.log(' ! this.NO_SELECTED_AUDIENCE ', this.NO_SELECTED_AUDIENCE);

    } else {
      this.NO_SELECTED_AUDIENCE = false;
      console.log(' ! this.NO_SELECTED_AUDIENCE ', this.NO_SELECTED_AUDIENCE);
    }

    this.authenticationService.checkCredentials();
  }


  /**
   * CASO: opzione selezionata 'Messaggio + link a pagina web' + l'utente esegue copia ed INCOLLA nel
   * campo input 'URL da lanciare' dell'url da lanciare piuttosto che digitarlo
   * il setTimeout risolve la necessità di dover cliccare in un punto vuoto affinchè il template si aggiorni
   * ed abiliti il button CONFERMA nel caso in cui l'URL sia valido
   * @param e
   */
  onPaste(e: any) {
    this.content = e.clipboardData.getData('text/plain');
    console.log('************** TESTO INCOLLATO ', this.content);

    setTimeout(() => {
      this.content = '';
    }, 0);
  }
  ngDoCheck() {

    console.log('============= 0> FORM VALIDO  (message-and-url.com) ', this.form.valid);
    console.log('============= 0> URL INSERITO (message-and-url.com) ', this.form.value.url);
    this.notificationService.hasValidUrl(this.form.valid);


    /**
     * * VALUTO LA LUNGHEZZA DELLA STRINGA NEL CAMPO INPUT DEL MESSAGGIO E SE L'AUDIENCE E DEFINITA (VEDI ngOnInit) PER
     *   ABILITARE/DISABILITARE IL BTN CONFERMA
     * * OTTENGO SE IL BTN CONFIRMED E STATO CLICCATO PER VISUALIZZARE LA SEZIONE DI RIEPILOGO
     */
    this.notificationService.setMessageLenght(this.message_lenght);
    console.log('-- -- -- > MESSAGE LENGHT SET IN NOTIFICATION MSG COMP (ngDoCheck)', this.message_lenght);

    this.selected_audience = this.notificationService.audienceSelected;
    console.log('-- -- -- > AUDIENCE SELECTED GET IN NOTIFICATION MSG (ngDoCheck)', this.selected_audience);

    console.log('CONFIRM IS CLICKED IN NOTIFICATION MSG ', this.notificationService.confirmIsClicked);
    this.confirm_is_clicked = this.notificationService.confirmIsClicked;

    /** notification service in ascolto sull validità dell'url */
    /* COMMENTO 09.01 */
    // this.notificationService.isValidUrl(this.HAS_INVALID_URL);

  }

  getUserSelection(): void {
    this.userSelection = this.route.snapshot.params['new'];
    // const userSelection = this.route.snapshot.queryParams['new'];
    console.log('MSG AND URL COMP -> OPZIONE SELEZIONATA DALL UTENTE: ', this.userSelection);
  }

  onSendToAllClick() {
    this.selected_audience = 'Invia a tutti';
    console.log('ON CLICK SEND TO ALL ', this.selected_audience);
    this.notificationService.audienceSelected = this.selected_audience;
    this.NO_SELECTED_AUDIENCE = false;
  }
  onSendToTesterClick() {
    this.selected_audience = 'Invia ad utenti test';
    console.log('ON CLICK SEND TO TESTER ', this.selected_audience);
    this.notificationService.audienceSelected = this.selected_audience;
    this.NO_SELECTED_AUDIENCE = false;
  }

  /**
   * ONKEY CALCOLO LUNGHEZZA STRINGA E LA INVIO (DA ngDoCheck()) A NOTIFICATION SERVICE DA CUI E' GET DAL C TOOLBAR  */
  onKey(event: any) {
    this.notification_message = event.target.value;
    console.log('-- -- >notification_message', this.notification_message);
    this.message_lenght = this.notification_message.length;
    console.log('- -- -- ON KEY LUNGHEZZA STRINGA ', this.message_lenght);
  }
  /* COMMENTO 09/01*/
  // onKeyURL(event: any) {
  //   this.launch_url = event.target.value;
  //   console.log('-- -- > -- -- > URL DA LANCIARE', this.launch_url);
  //   this.ValidURL(this.launch_url);
  // }


  // ValidURL(str) {
  //   const pattern = new RegExp(/^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?(\#([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?)?$/); // fragment locator
  //   if (!pattern.test(str)) {
  //     console.log('Please enter a valid URL.');
  //     this.invalidUrlErrorMsg = 'Si prega di ricontrollare l\'URL. Gli URL dei siti web devono iniziare con http:// o https://';
  //     this.HAS_INVALID_URL = true;
  //     console.log('HAS_INVALID_URL (message-and-url comp)', this.HAS_INVALID_URL);
  //     return false;
  //   } else {
  //     this.HAS_INVALID_URL = false;
  //     console.log('HAS_INVALID_URL (message-and-url comp) ', this.HAS_INVALID_URL);
  //     return true;
  //   }
  // }

  /**
   * INVIA NOTIFICA DEL TIPO SOLO MESSAGGIO
   * (RICHIAMA this.notificationService.sendNotificationOnlyMessage PASSANDO I PARAMETRI)
   */
  sendNotificationOnlyMessage() {
    this.SEND_MSG_IS_CLICKED = true;
    this.REQUEST_COMPLETE = false;
    console.log(`Massage entered by user: ${this.notification_message}`);

    if (this.selected_audience === 'Invia ad utenti test') {
      this.segment = 'Test Users';
    } else {
      this.segment = 'All';
    }
    this.notificationService.sendNotificationOnlyMessage(`${this.notification_message}`, `${this.segment}`);
    this.notificationService.REQUEST_COMPLETE.subscribe(
      value => {
        console.log('IN NOTIFICATION MSG request is complete', value);
        this.REQUEST_COMPLETE = value;
        console.log('2) REQUEST VALUE (GET IN NOTIFICATION MSG)', this.REQUEST_COMPLETE);

        if (this.REQUEST_COMPLETE === true) {

          this.openDialog();
          // this.router.navigate(['/dashboard']);
          // window.location.reload();
        }
      });
  }

  /**
   * INVIA NOTIFICA DEL TIPO MESSAGGIO + LINK A PAGINA WEB
   */
  sendNotificationMessageAndUrl() {
    this.SEND_MSG_IS_CLICKED = true;
    this.REQUEST_COMPLETE = false;
    console.log('1) REQUEST VALUE (GET IN NOTIFICATION MSG)', this.REQUEST_COMPLETE);

    console.log(` +++ MSG entered by user: ${this.notification_message}`);
    // console.log(` +++ Url entered by user: ${this.launch_url}`); this.form.value.url
    console.log(` +++ Url entered by user: ${this.form.value.url}`);
    if (this.selected_audience === 'Invia ad utenti test') {
      this.segment = 'Test Users';
    } else {
      this.segment = 'All';
    }
    this.notificationService.sendNotificationMessageAndUrl(`${this.notification_message}`, `${this.segment}`, `${this.form.value.url}`);

    this.notificationService.REQUEST_COMPLETE.subscribe(
      value => {
        console.log('IN NOTIFICATION MSG request is complete', value);
        this.REQUEST_COMPLETE = value;
        console.log('2) REQUEST VALUE (GET IB P-D)', this.REQUEST_COMPLETE);

        if (this.REQUEST_COMPLETE === true) {

          this.openDialog();
          // this.router.navigate(['/dashboard']);
          // window.location.reload();
        }
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogWindowComponent, {
      // height: '400px',
      // width: '600px'
      // data: { name: this.name, animal: this.animal }
      disableClose: true,

    });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result:`); // Pizza!
    // });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:`); // Pizza!
      this.router.navigate(['/dashboard']);
      window.location.reload();
    });
  }



  goBack(): void {
    this.location.back();
  }

  onSearch(input) {
    console.log(input.value);
  }


}
