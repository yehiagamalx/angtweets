import { Component, OnInit } from '@angular/core';
import {Itweets} from './../../../itweets'
import {Tweets} from './../../../tweetsApi'

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  tweets: Itweets[] = Tweets

  constructor() { }

  ngOnInit(): void {
  }

}
