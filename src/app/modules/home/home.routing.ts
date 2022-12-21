import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SingletweetComponent } from './singletweet/singletweet.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
      path: 'tweet/:id',
      component: SingletweetComponent
    }
]
