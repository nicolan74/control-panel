import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { APP_ID, ONESIGNAL_HEADER_AUTHORIZATION, ONESIGNAL_BASE_URL } from './conf';

@Injectable()
export class NotificationService {

  constructor(
    private http: Http,
  ) { }

  oneSignalNotification(message, selectedProduct): void {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', ONESIGNAL_HEADER_AUTHORIZATION);
    const options = new RequestOptions({ headers: headers });

    const body = {
      'app_id': APP_ID,
      'contents': { 'en': `${message}` },
      'included_segments': ['All'],
      'data': { 'id': `${selectedProduct}` }
    };

    console.log('POST REQUEST BODY ', body);
    this.http.post(ONESIGNAL_BASE_URL, JSON.stringify(body), options)
      .map(res => res.json())
      .subscribe(data => {
        console.log('---> POST REQUEST RESPONSE ', data);
      });
  }

}
