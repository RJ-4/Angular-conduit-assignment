import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from '../sign-in/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CreateArticleService {

  constructor(private http: Http, private authService: AuthService) { }

  createNewArticle(currentArticle: {'article': {'title': string, 'description': string, 'body': string, 'tagList'?: string[]}}) {
    return this.http.post('https://conduit.productionready.io/api/articles', currentArticle, this.authService.getHeaders());
  }
}
