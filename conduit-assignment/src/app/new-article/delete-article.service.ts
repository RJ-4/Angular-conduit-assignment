import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from '../sign-in/auth.service';
import { Router } from '@angular/router';
import { GetSelectedUserService } from '../selected-user/get-selected-user.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteArticleService {

  constructor(private http: Http, private authService: AuthService, private router: Router, private getSelectedUserService: GetSelectedUserService) { }

  deleteArticle(slug){
   return this.http.delete(`https://conduit.productionready.io/api/articles/${slug}`, this.authService.getHeaders());
  }
}
