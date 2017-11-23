import { Component, OnInit, ViewEncapsulation, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../notification.service';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogWindowComponent } from '../dialog-window/dialog-window.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationMessageComponent implements OnInit, DoCheck {
  userSelection: any;
  notification_message: string;
  message_lenght: number;
  selected_audience: string;
  NO_SELECTED_AUDIENCE = false;
  confirm_is_clicked = false;
  SEND_MSG_IS_CLICKED = false;
  REQUEST_COMPLETE: boolean;
  segment: string;
  launch_url: string;

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private location: Location,
    public dialog: MatDialog,
    private router: Router,
  ) { }

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
  }

  ngDoCheck() {
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
  }

  getUserSelection(): void {
    this.userSelection = this.route.snapshot.params['new'];
    // const userSelection = this.route.snapshot.queryParams['new'];
    console.log('NOTIFICATION COMP -> OPZIONE SELEZIONATA DALL UTENTE: ', this.userSelection);
  }

  /**
   * ONKEY CALCOLO LUNGHEZZA STRINGA E LA INVIO (DA ngDoCheck()) A NOTIFICATION SERVICE DA CUI E' GET DAL C TOOLBAR  */
  onKey(event: any) {
    this.notification_message = event.target.value;
    console.log('-- -- >notification_message', this.notification_message);
    this.message_lenght = this.notification_message.length;
    console.log('- -- -- ON KEY LUNGHEZZA STRINGA ', this.message_lenght);
  }
  onKeyURL(event: any) {
    this.launch_url = event.target.value;
    console.log('-- -- >URL DA LANCIARE', this.notification_message);
  }

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

  sendNotificationMessageAndUrl() {
    this.SEND_MSG_IS_CLICKED = true;
    this.REQUEST_COMPLETE = false;
    console.log('1) REQUEST VALUE (GET IN NOTIFICATION MSG)', this.REQUEST_COMPLETE);

    console.log(` +++ MSG entered by user: ${this.notification_message}`);
    console.log(` +++ Url entered by user: ${this.launch_url}`);
    if (this.selected_audience === 'Invia ad utenti test') {
      this.segment = 'Test Users';
    } else {
      this.segment = 'All';
    }
    this.notificationService.sendNotificationMessageAndUrl(`${this.notification_message}`, `${this.segment}`, `${this.launch_url}`);

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
