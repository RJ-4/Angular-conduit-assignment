import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from 'src/app/sign-in/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DeleteCommentService {

  constructor(private http: Http, private authService: AuthService, private router: Router) { }

  deleteComment(articleSlug: string, commentId: number){
    this.http.delete(`https://conduit.productionready.io/api/articles/${articleSlug}/comments/${commentId}`, this.authService.getHeaders()).subscribe(
      (response) => {
        console.log(response.json());
      },
      (error) => console.log('Failed to delete this comment!!!'),
      () => {
        // this.router.navigate([`/article/${articleSlug}`])
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=> this.router.navigate([`/article/${articleSlug}`]));
      }
    )
  }
}
