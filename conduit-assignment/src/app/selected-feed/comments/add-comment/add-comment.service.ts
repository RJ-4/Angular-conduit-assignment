import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from 'src/app/sign-in/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AddCommentService {

  constructor(private http: Http, private authService: AuthService) { }

  postComment(newComment: {'comment': {'body': string}}, slug: string){
    return this.http.post(`https://conduit.productionready.io/api/articles/${slug}/comments`, newComment, this.authService.getHeaders());
  }
}
