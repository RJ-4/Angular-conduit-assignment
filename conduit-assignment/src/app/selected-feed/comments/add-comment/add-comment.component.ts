import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/sign-in/auth.service';
import { NgForm } from '@angular/forms';
import { AddCommentService } from './add-comment.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DisplayCommentsComponent } from '../display-comments/display-comments.component';
import { DisplayCommentsService } from '../display-comments/display-comments.service';
import { DeleteCommentService } from '../delete-comment/delete-comment.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  loggedInUser;
  slug: string;

  loggedInUserLoaded: Promise<boolean>;
  isCommentPosted = false;

  getSlug(){
    if(this.slug){
      return this.slug;
    }
  }

  newComment: {'comment': {'body': string}};

  postedComment;
  isPostedCommentLoaded: Promise<boolean>;
  getPostedComment(){
    if(this.postedComment){
      return this.postedComment;
    }
  }

  constructor(private authService: AuthService, private addCommentService: AddCommentService, private route: ActivatedRoute, private deleteCommentService: DeleteCommentService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.slug = params['slug']
      }
    );

    this.authService.getLoggedInUser().subscribe(
      (response) => {
        this.loggedInUser = response.json().user;
        this.loggedInUserLoaded = Promise.resolve(true);
      }
    );
  }

  onPostComment(form: NgForm){
    this.isCommentPosted = true;
    this.newComment = {
      'comment': {
        'body': form.value.body
      }
    };
    if(this.authService.isLoggedIn()){
      this.addCommentService.postComment(this.newComment, this.getSlug()).subscribe(
        (response) => {
          this.postedComment = response.json().comment;
          this.isPostedCommentLoaded = Promise.resolve(true);
        }
      );
    }
  }

  onDeleteComment(){
    this.deleteCommentService.deleteComment(this.getSlug(), this.getPostedComment().id);
  }
}
