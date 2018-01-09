import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageAndContentDataSelectionComponent } from './message-and-content-data-selection/message-and-content-data-selection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessageAndContentComponent } from './message-and-content/message-and-content.component';
import { MessageAndUrlComponent } from './message-and-url/message-and-url.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'contentselection', component: MessageAndContentDataSelectionComponent },
  { path: 'detail/:id', component: MessageAndContentComponent },
  { path: 'detail', component: MessageAndContentDataSelectionComponent },
  { path: 'notification', component: MessageAndUrlComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


