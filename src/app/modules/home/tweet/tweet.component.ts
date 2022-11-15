import { Component, OnInit, Input } from '@angular/core';
import { Tweets } from 'src/app/tweetsApi';
import { Itweets } from 'src/app/itweets';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  @Input() tweet?: Itweets;

  constructor() { }

  ngOnInit(): void {
  }

}
