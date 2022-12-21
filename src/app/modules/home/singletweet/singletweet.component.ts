import { Component, OnInit } from '@angular/core';
import { TweetsService } from './../../../services/tweets.service';
import { ITweet } from './../../../itweets';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-singletweet',
  templateUrl: './singletweet.component.html',
  styleUrls: ['./singletweet.component.css']
})
export class SingletweetComponent implements OnInit {
  tweet: ITweet

  constructor(private tweetsService: TweetsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.tweetsService.getSingleTweet(params["id"]).subscribe((tweet) => {
        this.tweet = tweet["data"]
        this.tweetsService.getReplies(params["id"]).subscribe((replies) => {
          this.tweet.replies = replies
        })
      });
    })

  }


}

