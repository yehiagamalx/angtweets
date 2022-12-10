import { Routes } from "@angular/router";
import { CallbackComponent } from './callback/callback.component';
import { SigninComponent } from './signin/signin.component';


export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'signin'
    },
    {
        path: 'signin',
        component: SigninComponent
    },
    {
        path: 'callback',
        component: CallbackComponent
    },
]
