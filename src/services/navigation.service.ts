import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {

  NOTIFICATION_TYPE_SELECTED: any;
  AUDIENCE_SELECTED: any;
  constructor() { }

  /**
   * <- dalla DASHBOARD
   * -> alla TOOLBAR
   * @param notificatioTypeSelected
   */
  notificationTypeSelected(notificatioTypeSelected): void {
    this.NOTIFICATION_TYPE_SELECTED = notificatioTypeSelected;
    console.log('NAVIGATION SERVICE -> TIPO NOTIFICA SELEZIONATA: ', `${notificatioTypeSelected}`);
  }

  /**
   * <- dalla DASHBOARD
   * -> alla TOOLBAR
   * @param audienceSelected
   */
  // audienceSeleted(audienceSelected): void {
  //   this.AUDIENCE_SELECTED = audienceSelected;
  //   console.log('NAVIGATION SERVICE -> AUDIENCE SELEZIONATA SELEZIONATA: ', `${audienceSelected}`);
  // }
}
