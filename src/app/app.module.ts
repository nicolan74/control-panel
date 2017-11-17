import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { SearchProductService } from './search-product.service';
import { ProductsComponent } from './products/products.component';
import { NotificationService  } from './notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NotificationMessageComponent } from './notification-message/notification-message.component';
import { ToolbarComponent } from './toolbar/toolbar.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    DashboardComponent,
    ProductDetailComponent,
    NotificationMessageComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [SearchProductService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
