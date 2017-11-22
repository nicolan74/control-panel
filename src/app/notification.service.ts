// tslint:disable:max-line-length
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ONESIGNAL_EUROFOOD_APP_ID, ONESIGNAL_HEADER_AUTH_REST_API_KEYS, ONESIGNAL_POST_NOTIFICATION_BASE_URL, ONESIGNAL_GET_EUROFOOD_DEVICES_BASE_URL } from './conf';
import { Observable } from 'rxjs/Observable';
import { Devices } from '../models/onesignal_devices';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



@Injectable()
export class NotificationService {
  GET_DEVICES_URL_AND_APPID = ONESIGNAL_GET_EUROFOOD_DEVICES_BASE_URL + '?app_id=' + ONESIGNAL_EUROFOOD_APP_ID;
  notificationTypeSelected: string;
  audienceSelected: string;
  selectedProductId: any;
  inputMsgLengt: any;

  confirmIsClicked = false;

  // REQUEST_COMPLETE = false;

  // public mySubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public REQUEST_COMPLETE: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: Http,
  ) { }

  /**
   * MESSAGE AND LINK TO PRODUCT
   * @param message
   * @param selectedProduct
   */
  oneSignalNotificationLinkedToProduct(message, segment, selectedProduct): void {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', ONESIGNAL_HEADER_AUTH_REST_API_KEYS);
    const options = new RequestOptions({ headers: headers });

    const body = {
      'app_id': ONESIGNAL_EUROFOOD_APP_ID,
      'contents': { 'en': `${message}` },
      // 'included_segments': ['All'],
      // 'included_segments': ['Test Users'],
      'included_segments': [`${segment}` ],
      'data': { 'id': `${selectedProduct}` }
    };

    console.log('POST REQUEST BODY (MESSAGE AND LINK TO PRODUCT) ', body);
    this.http.post(ONESIGNAL_POST_NOTIFICATION_BASE_URL, JSON.stringify(body), options)
      .map(res => res.json())
      .subscribe(data => {
        console.log('---> POST REQUEST RESPONSE (MESSAGE AND LINK TO PRODUCT) ', data);
      },
      errMsg => {
        console.log('* ERROR *');
        // thi
        this.REQUEST_COMPLETE.next(false);
        // console.log('REQUEST_COMPLETE', this.REQUEST_COMPLETE);
      },
      () => {
        console.log('* COMPLETE *');

        // this.REQUEST_COMPLETE = true;
        // const myValue = 123;
        this.REQUEST_COMPLETE.next(true);
      }

    );
  }

  /**
   * ONLY MESSAGE
   * @param message
   */
  sendNotificationOnlyMessage(message): void {

    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', ONESIGNAL_HEADER_AUTH_REST_API_KEYS);
    const options = new RequestOptions({ headers: headers });

    const body = {
      'app_id': ONESIGNAL_EUROFOOD_APP_ID,
      'contents': { 'en': `${message}` },
      'included_segments': ['Test Users']
    };

    console.log('POST REQUEST BODY (ONLY MESSAGE) ', body);
    this.http.post(ONESIGNAL_POST_NOTIFICATION_BASE_URL, JSON.stringify(body), options)
      .map(res => res.json())
      .subscribe(data => {
        console.log('---> POST REQUEST RESPONSE (ONLY MESSAGE) ', data);
      });
  }

  /**
   * MESSAGE AND URL
   * @param message
   * @param url
   */
  sendNotificationMessageAndUrl(message, url): void {

    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', ONESIGNAL_HEADER_AUTH_REST_API_KEYS);
    const options = new RequestOptions({ headers: headers });

    const body = {
      'app_id': ONESIGNAL_EUROFOOD_APP_ID,
      'contents': { 'en': `${message}` },
      'included_segments': ['All'],
      'url': `${url}`
    };

    console.log('POST REQUEST BODY (MESSAGE AND URL) ', body);
    this.http.post(ONESIGNAL_POST_NOTIFICATION_BASE_URL, JSON.stringify(body), options)
      .map(res => res.json())
      .subscribe(data => {
        console.log('---> POST REQUEST RESPONSE (MESSAGE AND URL) ', data);
      });

  }

  public getOnesignalAppDevices(): Observable<Devices[]> {
    const url = `${this.GET_DEVICES_URL_AND_APPID}&limit=300&offset=0`;
    console.log('GET ONESIGNAL APP DEVICES ', url);
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', ONESIGNAL_HEADER_AUTH_REST_API_KEYS);
    return this.http
      .get(url, { headers: headers })
      // .map(response => response.json())
      // .map(json => json.body.news[0]);
      .map(res => <Devices[]>(res.json().players));
  }

  getNotificationTypeSelected(notificatioType): void {
    this.notificationTypeSelected = notificatioType;
    console.log('Notification Service COMP -> TIPO NOTIFICA SELEZIONATA: ', `${notificatioType}`);
  }

  getAudienceSelected(audienceSelected): void {
    this.audienceSelected = audienceSelected;
    console.log('Notification Service COMP -> AUDIENCE SELEZIONATA: ', `${audienceSelected}`);
  }

  /** VIENE SETTATO DAL COMPONENTE PRODUCTS SULL'ONSELECT DI UN PRODOTTO */
  getSelectedProduct(productId): void {
    this.selectedProductId = productId;
    console.log('Notification Service COMP -> ID PRODOTTO SELEZIONATO: ', `${productId}`);
  }

  /** IN PRODUCT DETAIL VIENE PASSATO IL VALORE VIENE 'GET' DA TOOLBAR  */
  setMessageLenght(msgLenght): void {
    this.inputMsgLengt = msgLenght;
    console.log('Notification Service COMP -> P-D INPUT LENGHT: ', `${msgLenght}`);
  }

  getIsConfirmClicked(isClicked): void {
    this.confirmIsClicked = isClicked;
    console.log('Notification Service COMP -> CONFIRM IS CLICKED: ', `${isClicked}`);
  }


  // selectedOption(notificatioType): void {
  //   console.log('Notification Service COMP -> TIPO NOTIFICA SELEZIONATA: ', `${notificatioType}`);

  //   if (this.notificationTypeSelected === 'Messaggio + link a contenuto') {


  //   } else if (this.notificationTypeSelected === 'Messaggio + link a pagina web') {


  //   } else if (this.notificationTypeSelected === 'Solo messaggio') {

  //   }

  // }

}
