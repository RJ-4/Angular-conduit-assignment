import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from '../sign-in/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateArticleService {

  constructor(private http: Http, private authService: AuthService) { }

  updateArticle(article, slug){
    return this.http.put(`https://conduit.productionready.io/api/articles/${slug}`, article, this.authService.getHeaders());
  }
}
