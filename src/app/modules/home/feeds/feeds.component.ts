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
  user: Itweets[] = []

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getTimeline().subscribe((tweets: any) => this.tweets =tweets["str"]["data"]);
  }

}
