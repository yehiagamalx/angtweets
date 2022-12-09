import { Component, OnInit } from '@angular/core';
import {Itweets} from './../../../itweets'
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  tweets: Itweets[] = [];

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getTimeline().subscribe((tweets: any) => {
      let tweetinfo = tweets["str"]["data"]
      let userinfo = tweets["str"]["includes"]["users"]
      this.tweets = tweetinfo
    });

  }

}

    // this.auth.getTimeline().subscribe((tweets: any) => this.tweets = tweets["str"]["includes"]["users"]);  this.tweets = tweets["str"]["data"]
