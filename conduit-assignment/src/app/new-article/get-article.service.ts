import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class GetArticleService {

  constructor(private http: Http) { }

  getArticle(slug){
    return this.http.get(`https://conduit.productionready.io/api/articles/${slug}`);
  }
}
