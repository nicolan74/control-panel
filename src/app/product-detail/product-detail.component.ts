import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SearchProductService } from '../search-product.service';
import { Product } from '../../models/product';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  product_id: number;
  selected_audience: any;
  notification_message: string;
  INPUT_IS_EMPTY = true;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private searchProductService: SearchProductService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.getProduct();

    /** 'GET' L'AUDIENCE SELEZIONATA DAL NOTIFICATION SERVICE CHE A SUA VOLTA 'GET' DAL DASHBOARD COMP  */
    this.selected_audience = this.notificationService.audienceSelected;
    console.log('AUDIENCE SELECTED GET IN PRODUCT DETAIL', this.selected_audience);
  }


  onKey(event: any) {
    this.notification_message = event.target.value;
    console.log('notification_message', this.notification_message);
    this.INPUT_IS_EMPTY = false;
    console.log('INPUT_IS_EMPTY ', this.INPUT_IS_EMPTY);

    /** PASSO IL VALORE A NOTIFICATION SERVICE */
    this.notificationService.getInputIsEmpty(this.INPUT_IS_EMPTY);
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

  sendNotification(message) {
    console.log(`Massage entered by user: ${message.value}`);

    this.notificationService.oneSignalNotificationLinkedToProduct(`${message.value}`, `${this.product_id}`);
  }
}
