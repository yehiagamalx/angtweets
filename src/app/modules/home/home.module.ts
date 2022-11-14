import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedsComponent } from './feeds/feeds.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FeedsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    FeedsComponent
  ]
})
export class HomeModule { }
