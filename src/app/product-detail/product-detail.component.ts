// tslint:disable:max-line-length
import { Component, OnInit, ViewEncapsulation, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SearchProductService } from '../search-product.service';
import { Product } from '../../models/product';
import { NotificationService } from '../notification.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogWindowComponent } from '../dialog-window/dialog-window.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent implements OnInit, DoCheck {
  product: Product;
  product_id: number;
  selected_audience: any;
  notification_message: string;
  INPUT_IS_EMPTY = true;
  REQUEST_COMPLETE: boolean;
  SEND_MSG_IS_CLICKED = false;

  confirm_is_clicked = false;
  segment: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private searchProductService: SearchProductService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private router: Router,
  ) {
    // console.log('CONFIRM IS CLICKED P-D ', this.notificationService.confirmIsClicked);

  }

  ngOnInit() {
    this.getProduct();

    /** 'GET' L'AUDIENCE SELEZIONATA DAL NOTIFICATION SERVICE CHE A SUA VOLTA 'GET' DAL DASHBOARD COMP  */
    this.selected_audience = this.notificationService.audienceSelected;
    console.log('-- -- -- >AUDIENCE SELECTED GET IN PRODUCT DETAIL', this.selected_audience);
  }

  ngDoCheck() {
    console.log('CONFIRM IS CLICKED P-D ', this.notificationService.confirmIsClicked);
    this.confirm_is_clicked = this.notificationService.confirmIsClicked;
  }

  onKey(event: any) {
    this.notification_message = event.target.value;
    console.log('-- -- >notification_message', this.notification_message);
    this.INPUT_IS_EMPTY = false;
    console.log('INPUT_IS_EMPTY ', this.INPUT_IS_EMPTY);

    /** PASSO IL VALORE A NOTIFICATION SERVICE */
    this.notificationService.getInputIsEmpty(this.INPUT_IS_EMPTY);
    // this.notificationService.getInputMessage(this.notification_message);
  }
  /**
   * DETTAGLIO DEL PRODOTTO PER VISUALIZZARLO NELL'ANTEPRIMA
   */
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



  goBack(): void {
    this.location.back();
  }

  // this.confirmClicked = this.notificationService.confirmIsClicked;
  getConfirmIsClicked() {
    console.log('CONFIRM IS CLICKED P-D ', this.notificationService.confirmIsClicked);
  }
  // this.notificationService.getIsConfirmClicked(isClicked) {

  // }



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
          this.router.navigate(['/dashboard']);

        }
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogWindowComponent, {
      // height: '400px',
      // width: '600px'
      // data: { name: this.name, animal: this.animal }
    });
  }
}
