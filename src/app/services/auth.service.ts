import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as crypto from "crypto";
import { v4 as uuidv4 } from 'uuid';
import { Settings } from '../settings';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {
  }



  getToken() {
    let params: any = {
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: this.getTimeStamp(),
      oauth_version: "1.0",
      oauth_nonce: this.getNonce(),
      oauth_consumer_key: Settings.apiKey,
    }
    let url = "https://api.twitter.com/oauth/request_token";
    let method = "POST"
    let header = this.getHeader(params, url, method, Settings.apiSecret, "")


    const body = {
      data: {
        method: method,
        url: url,
        body: "",
        headers: header
      }
    }
    this.http.post('http://localhost:3000/proxy', body).subscribe((value: any) => {
      let token = value.split("&")[0];
      window.location.href = `https://api.twitter.com/oauth/authorize?${token}`
    })
  }

  sendVerifyCode() {
    // const endUrl = 'https://api.twitter.com/oauth/access_token?'
    // let str = `${window.location.href}`
    // let newStr = str.split("callback?")[1]
    // const body = {
    //   data: {
    //     method: this.method,
    //     url: `${endUrl}${newStr}`,
    //     body: "",
    //     headers: ""
    //   }
    // }

    // return this.http.post<string>('http://localhost:3000/proxy', body)
    //   .pipe(map((value: string) => {
    //     let oauthParams = value.split("&")
    //     oauthParams.forEach((ele: any) => {
    //       let ele2 = ele.split("=");
    //       localStorage.setItem(ele2[0], ele2[1])
    //     });
    //   }))
  }


  getHeader(params: any, url: any, method: any, apiSecret: any, tokenSecret: any) {
    const paramsString = this.getParamsEncodedString(params);
    const signature = this.getSignature(method, url, paramsString, apiSecret, tokenSecret);
    return (params.oauth_token) ? `OAuth oauth_consumer_key="${params.oauth_consumer_key}",oauth_token="${params.oauth_token}",oauth_signature_method="${params.oauth_signature_method}",oauth_timestamp="${params.oauth_timestamp}",oauth_nonce="${params.oauth_nonce}",oauth_version="${params.oauth_version}",oauth_signature="${signature}"`
      :
      `OAuth oauth_consumer_key="${params.oauth_consumer_key}",oauth_nonce="${params.oauth_nonce}",oauth_signature="${signature}",oauth_signature_method="${params.oauth_signature_method}",oauth_timestamp="${params.oauth_timestamp}",oauth_version="${params.oauth_version}"`
  }


  private getParamsEncodedString(params: any) {
    const encodinParams: any = {};
    Object.keys(params).forEach((key, index) => {
      let encodingkey = this.percentEncode(key)
      let encodingvalue = this.percentEncode(params[key])
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

  private getSignature(method: string, url: string, paramString: string, apiSecret: string, tokenSecret: string) {
    const data: string = `${this.percentEncode(method)}&${this.percentEncode(url)}&${paramString}`;
    let key = `${this.percentEncode(apiSecret)}&${this.percentEncode(tokenSecret)}`
    const hmacSHA1 = crypto.createHmac('sha1', key).update(data).digest().toString('base64')
    return this.percentEncode(hmacSHA1)
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
}
