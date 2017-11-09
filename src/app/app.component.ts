// tslint:disable:max-line-length
import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'control-panel';

  // link = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=';

  http: Http;

  constructor(
    http: Http
  ) {
    this.http = http;
  }

  performSearch(searchTerm: HTMLInputElement): void {
    console.log(`User entered: ${searchTerm.value}`);
    // const apiLink = this.link + searchTerm.value;

    const apiLink = `https://test.eurofoodservice.it/api/products?output_format=JSON&display=[id,%20name,%20id_default_image,%20price,%20description]&filter[name]=[${searchTerm.value}]%25&ws_key=DDRSMHTSBZPQME7P7WFRFNXB29FGEU6C`;
    this.http.request(apiLink).subscribe((res: Response) => {
      console.log(res.json());
    },
      errMsg => {
        console.log('SEARCH ERROR MESSAGE', errMsg);
      },
      () => {

        console.log('SEARCH COMPLETE');
      }


    );


  }

}
