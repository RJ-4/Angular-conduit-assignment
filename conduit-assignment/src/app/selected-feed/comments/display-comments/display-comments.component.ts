import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DisplayCommentsService } from './display-comments.service';
import { AuthService } from 'src/app/sign-in/auth.service';
import { DeleteCommentService } from '../delete-comment/delete-comment.service';

@Component({
  selector: 'app-display-comments',
  templateUrl: './display-comments.component.html',
  styleUrls: ['./display-comments.component.css']
})
export class DisplayCommentsComponent implements OnInit {

  slug: string;
  comments = [];
  loggedInUsername;

  getSlug(){
    if(this.slug){
      return this.slug;
    }
  }

  constructor(private route: ActivatedRoute, private displayCommentsService: DisplayCommentsService, private authService: AuthService, private deleteCommentService: DeleteCommentService) {  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.slug = params['slug'];
      }
    );

    this.displayCommentsService.getComments(this.getSlug()).subscribe(
      (response) => {
        this.comments = response.json().comments;
      }
    );

    this.authService.getLoggedInUser().subscribe(
      (response) => {
        this.loggedInUsername = response.json().user.username;
      }
    );
  }

  onDeleteComment(commentId){
    this.deleteCommentService.deleteComment(this.getSlug(), commentId);
  }
}
