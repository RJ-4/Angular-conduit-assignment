import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class GlobalFeedService {

  constructor(private http: Http) { }

  getGlobalFeed(){
    return this.http.get('https://conduit.productionready.io/api/articles');
  }
}
