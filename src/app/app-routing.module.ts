import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdditionalDataSelectionComponent } from './additional-data-selection/additional-data-selection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdditionalDataMessageComponent } from './additional-data-message/additional-data-message.component';
import { OnlyAndLaunchurlMessageComponent } from './only-and-launchurl-message/only-and-launchurl-message.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: AdditionalDataSelectionComponent },
  { path: 'detail/:id', component: AdditionalDataMessageComponent },
  { path: 'notification', component: OnlyAndLaunchurlMessageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


