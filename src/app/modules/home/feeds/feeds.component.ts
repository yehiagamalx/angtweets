import { Component, OnInit } from '@angular/core';
import { ITweet } from './../../../itweets';
import { TweetsService } from './../../../services/tweets.service';
import { AuthService } from './../../../services/auth.service';



@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {
  tweets: ITweet[] = [];

  constructor(private tweetsService: TweetsService, private auth: AuthService) { }

  ngOnInit(): void {
    this.tweetsService.getTimeline().subscribe((res) => {
      this.tweets = res
    });
  }
}
