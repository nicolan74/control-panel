import { Component, OnInit, ViewEncapsulation, HostListener, ViewChild  } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav;
  navMode: string;
  opened: any = false;

  onOpenClick() {
    console.log('SIDE BAR OPENED ', this.sidenav.opened);
    this.opened = this.sidenav.opened;
    const d = document.getElementById('toggle_btn');
   //  d.className += ' otherclass';
 }

 onCloseClick() {
   console.log('SIDE BAR OPENED ', this.sidenav.opened);
   this.opened = this.sidenav.opened;
 }
  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.navMode = 'over';
      console.log('this.navMode', this.navMode);
      this.sidenav.close();
    }
    if (event.target.innerWidth > 768) {
      this.navMode = 'side';
      console.log('this.navMode', this.navMode);
      this.sidenav.open();
    }
  }

}
