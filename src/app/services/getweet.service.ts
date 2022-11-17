import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Itweets} from './../itweets'

@Injectable({
  providedIn: 'root'
})
export class GetweetService {


  private apiUrl = 'http://localhost:5000/tweets'


  constructor(private http:HttpClient) { }

  getTweets(): Observable<Itweets[]> {
    return this.http.get<Itweets[] >(this.apiUrl)
  }
}
