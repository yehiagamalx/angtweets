import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { routes } from './auth.routing';
import { CallbackComponent } from './callback/callback.component';
import { SigninComponent } from './signin/signin.component';



@NgModule({
  declarations: [
    CallbackComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
