import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedsComponent } from './feeds/feeds.component';
import { routes } from './home.routing';
import { TweetComponent } from './tweet/tweet.component';
import { SingletweetComponent } from './singletweet/singletweet.component';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FeedsComponent,
    TweetComponent,
    DashboardComponent,
    SingletweetComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FeedsComponent,
  ]
})
export class HomeModule { }
