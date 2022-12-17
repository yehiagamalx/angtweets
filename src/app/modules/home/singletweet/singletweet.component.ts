import { Component, OnInit } from '@angular/core';
import { TweetsService } from './../../../services/tweets.service';


@Component({
  selector: 'app-singletweet',
  templateUrl: './singletweet.component.html',
  styleUrls: ['./singletweet.component.css']
})
export class SingletweetComponent implements OnInit {

  constructor(private tweetsService: TweetsService) { }

  ngOnInit(): void {
    // this.tweetsService.getSingleTweet()
  }

}
