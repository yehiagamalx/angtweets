import { Component, Input, OnInit } from '@angular/core';
import { ITweet } from 'src/app/itweets';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  @Input() tweet?: ITweet;

  constructor() { }

  ngOnInit(): void {
  }

}
