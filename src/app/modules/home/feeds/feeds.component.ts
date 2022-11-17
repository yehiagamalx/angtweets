import { Component, OnInit } from '@angular/core';
import {Itweets} from './../../../itweets'
import {GetweetService} from '../../../services/getweet.service'

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  tweets: Itweets[] = [];

  constructor(private getweetService: GetweetService) { }

  ngOnInit(): void {

    this.getweetService.getTweets().subscribe((tweets) => this.tweets = tweets);
  }

}
