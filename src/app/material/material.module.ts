// tslint:disable:max-line-length
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatListModule, MatCardModule, MatGridListModule, MatRadioModule, MatInputModule, MatProgressBarModule, MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatRadioModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatRadioModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule
  ],
  declarations: []
})
export class MaterialModule { }
