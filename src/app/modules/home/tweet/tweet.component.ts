import { Component, Input, OnInit } from '@angular/core';
import { ITweet } from 'src/app/itweets';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  @Input() tweet?: ITweet;


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToTweet(id: number) {
    // /tweet/id
    this.router.navigateByUrl(`/home/tweet/${id}`)
  }


}
