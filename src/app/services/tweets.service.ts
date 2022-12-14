import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ITweet } from '../itweets';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {

  constructor(private auth: AuthService, private http: HttpClient) { }

  getTimeline(): Observable<ITweet[]> {
    // removed max_results=10
    const tweetUrl = `https://api.twitter.com/2/users/${localStorage.getItem('user_id')}/timelines/reverse_chronological?user.fields=profile_image_url&expansions=author_id&tweet.fields=attachments,author_id,created_at,public_metrics,source`
    const body = {
      data: {
        method: 'GET',
        url: `${tweetUrl}`,
        body: '',
        headers: this.auth.getHeaderString()
      }
    }

    return this.http.post<ITweet[]>('http://localhost:3000/proxy', body).pipe(
      map((res: any) => {
        let tweets: ITweet[] = [];
        console.log(res)
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
}
