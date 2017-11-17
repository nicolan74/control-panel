import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  notificationTypeSelected = 'Messaggio + link a contenuto';
  audienceSelected = 'Invia a tutti';
  // notificationTypeSelected: string

  notificationOptions = [
    'Messaggio + link a contenuto',
    'Solo messaggio',
    'Messaggio + link a pagina web',
  ];
  audienceOptions = [
    'Invia a tutti',
    'Invia ad utenti test',
  ];


  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.notificationService.getNotificationTypeSelected(this.notificationTypeSelected);
    this.notificationService.getAudienceSelected(this.audienceSelected);
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

  changeNotficationSelection(notificationTypeSelected) {
    console.log('IN DASHBOARD NOTIFICATION TYPE SELECTED ', this.notificationTypeSelected);
    this.notificationService.getNotificationTypeSelected(this.notificationTypeSelected);
  }
  changeAudienceSelection(audienceSelected) {
    this.notificationService.getAudienceSelected(this.audienceSelected);
    console.log('IN DASHBOARD AUDIENCE SELECTED ', this.audienceSelected);
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
