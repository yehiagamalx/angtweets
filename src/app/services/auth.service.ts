import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { v4 as uuidv4 } from 'uuid';
import * as crypto from "crypto";

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

  constructor(private http:HttpClient) {

  }


  getHeaderString() {
   return  `OAuth oauth_consumer_key="${this.conusmerkey}",oauth_nonce="${this.params.oauth_nonce}",oauth_signature="${this.getSignature()}",oauth_signature_method="${this.params.oauth_signature_method}",oauth_timestamp="${this.TimeStamp}",oauth_version="${this.params.oauth_version}"`
  }

  getTimeStamp() {
    return Math.floor(Date.now() / 1000)
  }

  getNonce() {
    return uuidv4()
  }

  getOauthEncoding() {
    const encodinParams: any = {};
    Object.keys(this.params).forEach((key, index) => {
      let encodingkey = encodeURIComponent(key)
      let encodingvalue = encodeURIComponent(this.params[key])
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
      }  else {
        objString += `&${key}=${objSorted[key]}`
      }
    })
    return encodeURIComponent(objString)
  }


  getSignature() {
    const newMethod: string = this.method.toUpperCase()
    const newUrl: string = encodeURIComponent(this.tokenUrl)
    const data: string = `${newMethod}&${newUrl}&${this.getOauthEncoding()}`
    let key: string = `${encodeURIComponent(this.apiSecret)}&`
    const hmacSHA1 = crypto.createHmac('sha1',key).update(data).digest().toString('base64')
    return encodeURIComponent(hmacSHA1)

  }

  getToken() {
    const body = {

      data:{
        method: this.method,
        url: this.tokenUrl,
        body: "",
        headers: this.getHeaderString()

      } }
    return this.http.post('http://localhost:3000/proxy', body).subscribe((value: any) => {
      let token = value['str'].split("&")[0];
      window.location.href=`https://api.twitter.com/oauth/authorize?${token}`
       console.log(token)
  })
  }

  sendVerfiyCode(){
    const endUrl = 'https://api.twitter.com/oauth/access_token?'
    let str = `${window.location.href}`
    let newStr = str.split("callback?")[1]
    const body = {
      data:{
       method: this.method,
       url: `${endUrl}${newStr}`,
       body: "",
       headers: ""
      }}

      return this.http.post('http://localhost:3000/proxy', body).subscribe((value: any) => { console.log(value['str'])  })
  }


}


