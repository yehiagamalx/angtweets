import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as crypto from "crypto";
import { map } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private tokenUrl: string = 'https://api.twitter.com/oauth/request_token'
  private apiSecret: string = '8mcQGhBGR3jM5x0sya99f7Gq25qZ69OOI2FaDMGHjKLuaeffUZ'
  private method: string = "POST"
  private nonce: string = this.getNonce()
  private TimeStamp: number = this.getTimeStamp()
  private conusmerkey: string = 'cykyypzuWQ4w9OVpY1HMm6iF9'
  private params: any = {
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: this.TimeStamp,
    oauth_version: "1.0",
    oauth_nonce: this.nonce,
    oauth_consumer_key: this.conusmerkey,
  }
  constructor(private http: HttpClient) {
  }

  private percentEncode(str: string) {
    return encodeURIComponent(str)
      .replace(/[!'()]/g, escape)
      .replace(/\*/g, "%2A");
  }



  private getTimeStamp() {
    return Math.floor(Date.now() / 1000)
  }

  private getNonce() {
    return uuidv4()
  }

  private getOauthEncoding() {

    if (localStorage.getItem("oauth_token")) {
      this.params["oauth_token"] = localStorage.getItem("oauth_token")
      this.params["user.fields"] = 'profile_image_url';
      this.params["expansions"] = 'author_id';
      this.params["tweet.fields"] = 'attachments,author_id,created_at,public_metrics,source'
      // this.params["max_results"] = 10;
    }


    const encodinParams: any = {};
    Object.keys(this.params).forEach((key, index) => {
      let encodingkey = this.percentEncode(key)
      let encodingvalue = this.percentEncode(this.params[key])
      encodinParams[encodingkey] = encodingvalue;
    })

    let objString: string = "";
    let objSorted: any = {}
    Object.keys(encodinParams).sort().forEach((key) => {
      objSorted[key] = encodinParams[key]
    })
    Object.keys(objSorted).forEach((key) => {
      if (objString === "") {
        objString += `${key}=${objSorted[key]}`
      } else {
        objString += `&${key}=${objSorted[key]}`
      }
    })
    return this.percentEncode(objString)

  }


  private getSignature() {
    const newMethod: string = localStorage.getItem("oauth_token_secret") ? 'GET' : 'POST'
    let newUrl: string = ''
    if (localStorage.getItem("oauth_token_secret")) {
      newUrl = this.percentEncode(`https://api.twitter.com/2/users/${localStorage.getItem('user_id')}/timelines/reverse_chronological`)
    } else { newUrl = this.percentEncode(this.tokenUrl) }
    const data: string = `${newMethod}&${newUrl}&${this.getOauthEncoding()}`
    let key: string = ''
    if (localStorage.getItem("oauth_token_secret")) {
      let tokenSecret = localStorage.getItem("oauth_token_secret") as string
      key = `${this.percentEncode(this.apiSecret)}&${this.percentEncode(tokenSecret)}`
    } else { key = `${this.percentEncode(this.apiSecret)}&` }
    const hmacSHA1 = crypto.createHmac('sha1', key).update(data).digest().toString('base64')
    return this.percentEncode(hmacSHA1)

  }


  getHeaderString() {
    return localStorage.getItem('oauth_token') ? `OAuth oauth_consumer_key="${this.conusmerkey}",oauth_token="${localStorage.getItem("oauth_token")}",oauth_signature_method="${this.params.oauth_signature_method}",oauth_timestamp="${this.TimeStamp}",oauth_nonce="${this.nonce}",oauth_version="${this.params.oauth_version}",oauth_signature="${this.getSignature()}"`
      :
      `OAuth oauth_consumer_key="${this.conusmerkey}",oauth_nonce="${this.params.oauth_nonce}",oauth_signature="${this.getSignature()}",oauth_signature_method="${this.params.oauth_signature_method}",oauth_timestamp="${this.TimeStamp}",oauth_version="${this.params.oauth_version}"`

  }

  getToken() {
    const body = {
      data: {
        method: this.method,
        url: this.tokenUrl,
        body: "",
        headers: this.getHeaderString()
      }
    }
    return this.http.post('http://localhost:3000/proxy', body).subscribe((value: any) => {
      let token = value.split("&")[0];
      window.location.href = `https://api.twitter.com/oauth/authorize?${token}`
    })
  }

  sendVerifyCode() {
    const endUrl = 'https://api.twitter.com/oauth/access_token?'
    let str = `${window.location.href}`
    let newStr = str.split("callback?")[1]
    const body = {
      data: {
        method: this.method,
        url: `${endUrl}${newStr}`,
        body: "",
        headers: ""
      }
    }

    return this.http.post<string>('http://localhost:3000/proxy', body)
      .pipe(map((value: string) => {
        let oauthParams = value.split("&")
        oauthParams.forEach((ele: any) => {
          let ele2 = ele.split("=");
          localStorage.setItem(ele2[0], ele2[1])
        });
      }))
  }

  // let callbackStr = value
  // console.log(callbackStr);
  //


  // getTimeline() {
  //   const tweetUrl = 'https://api.twitter.com/2/users/1566695939607302146/timelines/reverse_chronological'
  //   const body = {
  //     data: {
  //       method: 'GET',
  //       url: `${tweetUrl}`,
  //       body: '',
  //       headers: this.getHeaderString()
  //     }}

  //     return this.http.post('http://localhost:3000/proxy', body).subscribe((value: any) => {console.log(value)})
  // }





}


