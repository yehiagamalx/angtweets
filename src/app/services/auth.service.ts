import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as crypto from "crypto";
import { map } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Settings } from '../settings';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {
  }

  getBearer() {
    let endPoint = "https://api.twitter.com/oauth2/token?grant_type=client_credentials"
    let method = "POST"
    let key = btoa(`${Settings.apiKey}:${Settings.apiSecret}`)
    const body = {
      data: {
        method: method,
        url: endPoint,
        body: "",
        headers: `Basic ${key}`
      }
    }
    this.http.post<string>(Settings.proxyUrl, body).subscribe((value: any) => {
      localStorage.setItem("bearer_token",value["access_token"])}

    )}


  getToken() {
    let url = "https://api.twitter.com/oauth/request_token";
    let method = "POST"
    let params = this.paramsObj()
    let header = this.getHeader(params, url, method, Settings.apiSecret, "")


    const body = {
      data: {
        method: method,
        url: url,
        body: "",
        headers: header
      }
    }
    this.http.post(Settings.proxyUrl, body).subscribe((value: any) => {
      let token = value.split("&")[0];
      window.location.href = `https://api.twitter.com/oauth/authorize?${token}`
    })
  }

  sendVerifyCode() {
    let method = 'GET'
    let url = 'https://api.twitter.com/oauth/access_token?'
    let str = `${window.location.href}`
    let newStr = str.split("callback?")[1]
    const body = {
      data: {
        method: method,
        url: `${url}${newStr}`,
        body: "",
        headers: ""
      }
    }

    return this.http.post<string>(Settings.proxyUrl, body)
      .pipe(map((value: string) => {
        let oauthParams = value.split("&")
        oauthParams.forEach((ele: any) => {
          let ele2 = ele.split("=");
          localStorage.setItem(ele2[0], ele2[1])
        });
      }))
  }

  paramsObj(reqParams: any = null) {
    let params: any = {
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: this.getTimeStamp(),
      oauth_version: "1.0",
      oauth_nonce: this.getNonce(),
      oauth_consumer_key: Settings.apiKey,
    }

    if (reqParams) {
      // Object.keys(reqParams).forEach((key) => {
      //   params[key] = reqParams[key]
      // })
      params = {...params, ...reqParams}
    }


    return params
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
    console.log(objString)
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

  private  getNonce() {
    return uuidv4()
  }
}
