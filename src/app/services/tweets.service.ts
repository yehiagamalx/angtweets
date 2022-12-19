import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';
import { AuthService } from './auth.service';
import { Settings } from '../settings';
import { ITweet } from '../itweets';




@Injectable({
  providedIn: 'root'
})
export class TweetsService {

  constructor(private auth: AuthService, private http: HttpClient) { }

  getTimeline(): Observable<ITweet[]> {

    let reqParams: any = {};
    reqParams["oauth_token"] = Settings.oauthToken;
    reqParams["user.fields"] = 'profile_image_url';
    reqParams["expansions"] = 'author_id';
    reqParams["tweet.fields"] = 'attachments,author_id,created_at,public_metrics,source';

   let url = `https://api.twitter.com/2/users/${Settings.userID}/timelines/reverse_chronological?user.fields=profile_image_url&expansions=author_id&tweet.fields=attachments,author_id,created_at,public_metrics,source`;
    let params = this.auth.paramsObj(reqParams)
    let method = "GET"
    let header = this.auth.getHeader(params, url.split('?')[0], method, Settings.apiSecret, Settings.tokenSecret)

    const body = {
      data: {
        method: method,
        url: url,
        body: '',
        headers: header
      }
    }

    return this.http.post<ITweet[]>(Settings.proxyUrl, body).pipe(
      map((res: any) => {
        let tweets: ITweet[] = [];
        console.log(res.data)
        res.data.map((t: any) => {
          let tweet: ITweet = {
            text: t.text,
            id: t.id,
            user: res.includes.users.find((x: any) => x.id == t.author_id),
            time: 0,
            like_count: t.public_metrics["like_count"],
            retweet_count: t.public_metrics["retweet_count"],
            reply_count: t.public_metrics["reply_count"],

          };
          tweets.push(tweet);
        })
        return tweets;
      }))
  }

  getSingleTweet() {
    let reqParams: any = {};
    reqParams["oauth_token"] = Settings.oauthToken;
    let params = this.auth.paramsObj(reqParams)
    let tweetID = window.location.href.split("?")[1].slice(0, -1)
    let url = `https://api.twitter.com/2/tweets/${tweetID}`;
    let method = "GET"
    let header = this.auth.getHeader(params, url, method, Settings.apiSecret, Settings.tokenSecret)
    const body = {
      data: {
        method: method,
        url: url,
        body: '',
        headers: header
      }
    }
    return this.http.post(Settings.proxyUrl, body).subscribe((res: any) => {
      // console.log(res)
    })
  }


  getReplies(){
    if(!localStorage.getItem("bearer_token")){
      this.auth.getBearer()

    }
  }



}
