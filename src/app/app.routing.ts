import { Routes } from "@angular/router";



export const routes: Routes = [
  // {
  //   path: '',
  //   component: DashboardComponent
  // },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'home',
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule)
      }
    ]
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/auth/auth.module').then((m) => m.LoginModule)
      }
    ]
  },

];


