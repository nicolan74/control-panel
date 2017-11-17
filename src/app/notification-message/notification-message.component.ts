import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../notification.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationMessageComponent implements OnInit {
  userSelection: any;

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getUserSelection();
  }

  getUserSelection(): void {
    this.userSelection = this.route.snapshot.params['new'];
    // const userSelection = this.route.snapshot.queryParams['new'];
    console.log('NOTIFICATION COMP -> OPZIONE SELEZIONATA DALL UTENTE: ', this.userSelection);
  }

  sendNotificationOnlyMessage(message) {
    console.log(`Massage entered by user: ${message.value}`);

    // this.notificationService.oneSignalNotification(`${message.value}`, `${this.selectedProduct.id}`);
    this.notificationService.sendNotificationOnlyMessage(`${message.value}`);
  }

  sendNotificationMessageAndUrl(message, url) {
    console.log(`Url entered by user: ${url.value}`);
    this.notificationService.sendNotificationMessageAndUrl(`${message.value}`, `${url.value}`);

  }

  goBack(): void {
    this.location.back();
  }

  onSearch(input) {
    console.log(input.value);
  }


}
