import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { SearchProductService } from './../services/search-product.service';
import { MessageAndContentDataSelectionComponent } from './message-and-content-data-selection/message-and-content-data-selection.component';
import { NotificationService } from './../services/notification.service';
import { AuthenticationService } from './../services/authentication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessageAndContentComponent } from './message-and-content/message-and-content.component';
import { MessageAndUrlComponent } from './message-and-url/message-and-url.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DialogWindowComponent } from './dialog-window/dialog-window.component';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NavigationService } from './../services/navigation.service';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MessageAndContentDataSelectionComponent,
    DashboardComponent,
    MessageAndContentComponent,
    MessageAndUrlComponent,
    ToolbarComponent,
    DialogWindowComponent,
    LoginComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    DialogWindowComponent,
  ],
  providers: [SearchProductService, NotificationService, AuthenticationService, NavigationService,
    {provide: LocationStrategy, useClass: HashLocationStrategy} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
