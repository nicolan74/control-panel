import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogWindowComponent implements OnInit {

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<DialogWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onOkClick(): void {
    this.dialogRef.close();
    console.log('OK CLICKED');
  }

  // closeDialog() {
  //   this.dialogRef.close('Pizza!');
  // }
  ngOnInit() {
  }

}
