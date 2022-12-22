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
  tweetText: any;

  constructor(private tweetsService: TweetsService, private auth: AuthService) { }

  ngOnInit(): void {
    this.tweetsService.getTimeline().subscribe((res) => {
      this.tweets = res
    });
  }

  tweetSubmit(value: any){
  this.tweetsService.postTweet(value).subscribe((res) => {console.log(res)})
  }
}
