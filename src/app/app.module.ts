import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { SearchProductService } from './search-product.service';
import { ProductsComponent } from './products/products.component';
import { NotificationService  } from './notification.service';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [SearchProductService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
