import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { SearchProductService } from './../services/search-product.service';
import { AdditionalDataSelectionComponent } from './additional-data-selection/additional-data-selection.component';
import { NotificationService } from './../services/notification.service';
import { AuthenticationService } from './../services/authentication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdditionalDataMessageComponent } from './additional-data-message/additional-data-message.component';
import { OnlyAndLaunchurlMessageComponent } from './only-and-launchurl-message/only-and-launchurl-message.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DialogWindowComponent } from './dialog-window/dialog-window.component';



@NgModule({
  declarations: [
    AppComponent,
    AdditionalDataSelectionComponent,
    DashboardComponent,
    AdditionalDataMessageComponent,
    OnlyAndLaunchurlMessageComponent,
    ToolbarComponent,
    DialogWindowComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule
  ],
  entryComponents: [
    DialogWindowComponent,
  ],
  providers: [SearchProductService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
