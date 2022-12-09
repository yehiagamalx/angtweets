import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedsComponent } from './feeds/feeds.component';
import { SharedModule } from '../shared/shared.module';
import { TweetComponent } from './tweet/tweet.component';


@NgModule({
  declarations: [
    FeedsComponent,
    TweetComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    FeedsComponent,
  ]
})
export class HomeModule { }
