import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DisplayCommentsService {

  constructor(private http: Http) { }

  getComments(slug: string){
    return this.http.get(`https://conduit.productionready.io/api/articles/${slug}/comments`);
  }
}
