import { Component, OnInit, ViewEncapsulation, DoCheck } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit, DoCheck {
  notificationTypeSelected: string;
  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {

  }

  ngDoCheck() {
    this.notificationTypeSelected = this.notificationService.notificationTypeSelected;
    console.log('TOOLBAR COMP -> TIPO NOTIFICA SELEZIONATA: ', this.notificationTypeSelected);
  }

  goToselectedOption() {
    if (this.notificationTypeSelected === 'Messaggio + link a contenuto') {
      this.router.navigate(['/products']);
      this.notificationService.notificationTypeSelected = this.notificationTypeSelected;
    } else if (this.notificationTypeSelected === 'Messaggio + link a pagina web') {
      this.router.navigate(['/notification', { new: 'message+url' }]);

    } else if (this.notificationTypeSelected === 'Solo messaggio') {
      this.router.navigate(['/notification', { new: 'message' }]);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
