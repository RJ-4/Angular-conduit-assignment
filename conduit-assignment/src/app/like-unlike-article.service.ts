import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './sign-in/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LikeUnlikeArticleService {

  constructor(private http: Http, private authService: AuthService) { }

  likeArticle(slug: string){
    return this.http.post(`https://conduit.productionready.io/api/articles/${slug}/favorite`,{},this.authService.getHeaders());
  }

  unlikeArticle(slug: string){
    return this.http.delete(`https://conduit.productionready.io/api/articles/${slug}/favorite`, this.authService.getHeaders());
  }
}
