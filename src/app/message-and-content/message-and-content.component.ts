// tslint:disable:max-line-length
import { Component, OnInit, ViewEncapsulation, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SearchProductService } from '../../services/search-product.service';
import { Product } from '../../models/product';
import { NotificationService } from '../../services/notification.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogWindowComponent } from '../dialog-window/dialog-window.component';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-message-and-content',
  templateUrl: './message-and-content.component.html',
  styleUrls: ['./message-and-content.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessageAndContentComponent implements OnInit, DoCheck {
  product: Product;
  product_id: number;
  selected_audience: any;
  notification_message: string;
  INPUT_IS_EMPTY = true;
  REQUEST_COMPLETE: boolean;
  SEND_MSG_IS_CLICKED = false;
  NO_SELECTED_AUDIENCE = false;

  IS_DISABLE_SEND_MSG_BTN = false;

  confirm_is_clicked = false;
  segment: string;
  message_lenght: number;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private searchProductService: SearchProductService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // console.log('CONFIRM IS CLICKED P-D ', this.notificationService.confirmIsClicked);

  }

  ngOnInit() {
    console.log(' -- ---- --- -- -- ADDITIONAL-DATA-MESSAGE-COMP -- NG ON INIT ');
    this.getProduct();

    /** 'GET' L'AUDIENCE SELEZIONATA DAL NOTIFICATION SERVICE CHE A SUA VOLTA 'GET' DAL DASHBOARD COMP  */
    this.selected_audience = this.notificationService.audienceSelected;
    console.log('-- -- -- > AUDIENCE SELECTED GET IN ADDITIONAL-DATA-MESSAGE-COMP (ngOnInit)', this.selected_audience);

    if (this.selected_audience === undefined) {
      this.NO_SELECTED_AUDIENCE = true;
      console.log(' ! this.NO_SELECTED_AUDIENCE ', this.NO_SELECTED_AUDIENCE);

    } else {
      this.NO_SELECTED_AUDIENCE = false;
      console.log(' ! this.NO_SELECTED_AUDIENCE ', this.NO_SELECTED_AUDIENCE);
    }

    this.authenticationService.checkCredentials();
    /** DISABILITO IL BTN INVIA MESSAGGIO AL VERIFICARSI DI UNA DI QUESTE CONDIZIONI */
    // if ((this.NO_SELECTED_AUDIENCE === true) || (this.INPUT_IS_EMPTY === true) || (this.product_id)) {
    //   this.IS_DISABLE_SEND_MSG_BTN = true;
    // } else {
    //   this.IS_DISABLE_SEND_MSG_BTN = false;
    // }
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

  ngDoCheck() {
    console.log('CONFIRM IS CLICKED P-D ', this.notificationService.confirmIsClicked);
    this.confirm_is_clicked = this.notificationService.confirmIsClicked;

    this.selected_audience = this.notificationService.audienceSelected;
    console.log('-- -- -- > AUDIENCE SELECTED GET IN ADDITIONAL-DATA-MESSAGE-COMP (ngDoCheck)', this.selected_audience);

    this.notificationService.setMessageLenght(this.message_lenght);
    console.log('-- -- -- > MESSAGE LENGHT SET IN ADDITIONAL-DATA-MESSAGE-COMP (ngDoCheck)', this.message_lenght);
  }

  /** ONKEY CALCOLO LUNGHEZZA STRINGA E LA INVIO (DA ngDoCheck()) A NOTIFICATION SERVICE DA CUI E' 'GET' DAL C TOOLBAR  */
  onKey(event: any) {
    this.notification_message = event.target.value;
    console.log('-- -- >notification_message', this.notification_message);
    this.message_lenght = this.notification_message.length;
    console.log('- -- -- ON KEY LUNGHEZZA STRINGA ', this.message_lenght);
    // this.notificationService.setMessageLenght(this.message_lenght);

    //     if (message_lenght >= 2) {
    //       this.INPUT_IS_EMPTY = false;
    //       console.log('INPUT_IS_EMPTY ', this.INPUT_IS_EMPTY);
    //       /** PASSO IL VALORE A NOTIFICATION SERVICE DA CUI A SUA VOLTA VA A VEDRE TOOLBAR
    //        * PER GESTIRE IL DISABLE/ENABLE DEL BTN CONFERMA */
    //       this.notificationService.getInputIsEmpty(this.INPUT_IS_EMPTY);
    //     } else {
    //       this.INPUT_IS_EMPTY = true;
    //       console.log('INPUT_IS_EMPTY ', this.INPUT_IS_EMPTY);
    //       /** PASSO IL VALORE A NOTIFICATION SERVICE DA CUI A SUA VOLTA VA A VEDRE TOOLBAR
    //  * PER GESTIRE IL DISABLE/ENABLE DEL BTN CONFERMA */
    //       this.notificationService.getInputIsEmpty(this.INPUT_IS_EMPTY);
    //     }



    // this.notificationService.getInputMessage(this.notification_message);
  }
  /**
   * DETTAGLIO DEL PRODOTTO PER VISUALIZZARLO NELL'ANTEPRIMA */
  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('ID PASSATO DA PRODUCT COMPONENT ', id);

    this.searchProductService.loadProductDetails(id).subscribe(product => {
      console.log('PRODOTTO ', product);
      console.log('ID PRODOTTO ', product.id);
      this.product = product;
      this.product_id = product.id;
    });
  }

  /** IN NOTIFICATION SERVICE VIENE 'GET' DA TOOLBAR SE IL BTN CONFERMA E' CLICCATO */
  getConfirmIsClicked() {
    console.log('CONFIRM IS CLICKED P-D ', this.notificationService.confirmIsClicked);
  }


  sendNotification() {
    this.REQUEST_COMPLETE = false;
    this.SEND_MSG_IS_CLICKED = true;
    console.log('1) REQUEST VALUE (GET IB P-D)', this.REQUEST_COMPLETE);
    // console.log(`Massage entered by user: ${message.value}`);
    // this.notificationService.oneSignalNotificationLinkedToProduct(`${message.value}`, `${this.product_id}`);

    console.log(`Massage entered by user: ${this.notification_message}`);
    if (this.selected_audience === 'Invia ad utenti test') {
      this.segment = 'Test Users';
    } else {
      this.segment = 'All';
    }
    this.notificationService.oneSignalNotificationLinkedToProduct(`${this.notification_message}`, `${this.segment}`, `${this.product_id}`);

    this.notificationService.REQUEST_COMPLETE.subscribe(
      value => {
        console.log('P-D request is complete', value);
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
}
