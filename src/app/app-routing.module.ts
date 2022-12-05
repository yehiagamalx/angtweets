import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SigninComponent } from '../app/modules/login/signin/signin.component';
import { CallbackComponent } from '../app/modules/login/callback/callback.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'callback', component: CallbackComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
