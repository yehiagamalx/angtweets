import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallbackComponent } from './callback/callback.component';
import { SigninComponent } from './signin/signin.component';



@NgModule({
  declarations: [
    CallbackComponent,
    SigninComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LoginModule { }
