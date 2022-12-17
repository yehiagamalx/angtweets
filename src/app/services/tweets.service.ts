import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class TweetsService {

  constructor(private auth: AuthService, private http: HttpClient) { }

  // getTimeline(): Observable<ITweet[]> {
  //   // removed max_results=10
  //   const timelineUrl = `https://api.twitter.com/2/users/${localStorage.getItem('user_id')}/timelines/reverse_chronological?user.fields=profile_image_url&expansions=author_id&tweet.fields=attachments,author_id,created_at,public_metrics,source`
  //   const body = {
  //     data: {
  //       method: 'GET',
  //       url: `${timelineUrl}`,
  //       body: '',
  //       headers: this.auth.getHeaderString()
  //     }
  //   }

  //   return this.http.post<ITweet[]>('http://localhost:3000/proxy', body).pipe(
  //     map((res: any) => {
  //       let tweets: ITweet[] = [];
  //       res.data.map((t: any) => {
  //         let tweet: ITweet = {
  //           text: t.text,
  //           id: t.id,
  //           user: res.includes.users.find((x: any) => x.id == t.author_id),
  //           time: 0,
  //           like_count: t.public_metrics["like_count"],
  //           retweet_count: t.public_metrics["retweet_count"],
  //           reply_count: t.public_metrics["reply_count"],

  //         };
  //         tweets.push(tweet);
  //       })
  //       return tweets;
  //     }))
  // }

  // getSingleTweet() {
  //   let tweetID = window.location.href.split("?")[1].slice(0, -1)
  //   console.log(tweetID)
  //   const body = {
  //     data: {
  //       method: 'GET',
  //       url: `https://api.twitter.com/2/tweets/${tweetID}`,
  //       body: '',
  //       headers: ''
  //     }
  //   }
  //   return this.http.post('http://localhost:3000/proxy', body).subscribe((res: any) => {
  //     console.log(res)
  //   })
  // }


  //  what is next is temp - dont push

}
