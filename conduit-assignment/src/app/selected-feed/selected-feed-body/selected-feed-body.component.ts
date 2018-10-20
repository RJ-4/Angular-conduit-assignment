import { Component, OnInit } from '@angular/core';
import { GlobalFeedService } from 'src/app/home-page/global-feed/global-feed.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/sign-in/auth.service';
import { DeleteArticleService } from 'src/app/new-article/delete-article.service';

@Component({
  selector: 'app-selected-feed-body',
  templateUrl: './selected-feed-body.component.html',
  styleUrls: ['./selected-feed-body.component.css']
})
export class SelectedFeedBodyComponent implements OnInit {

  feeds = [];
  slug: string;

  getSlug(){
    if(this.slug){
      return this.slug;
    }
  }

  isSignedIn = false;

  loggedInUsername;

  getLoggedInUsername(){
    if(this.loggedInUsername){
      return this.loggedInUsername;
    }
  }
  
  constructor(private globalFeedService: GlobalFeedService, private route: ActivatedRoute, private authService: AuthService, private router: Router, private deleteArticleService: DeleteArticleService) { }

  ngOnInit() {

    this.isSignedIn = this.authService.isLoggedIn();

    this.globalFeedService.getGlobalFeed()
    .subscribe(
      (response) => {
        const data = response.json();
        this.feeds = data.articles;
      }
    );

    this.route.params.subscribe(
      (params: Params) => {
        this.slug = params['slug'];
      }
    );

    this.authService.getLoggedInUser().subscribe(
      (response) => {
        this.loggedInUsername = response.json().user.username;
      }
    )
  }

  onUpdateArticle(slug){
    this.router.navigate([`/editor/${slug}`]);
  }

  onDeleteArticle(slug: string){
    this.deleteArticleService.deleteArticle(slug).subscribe(
      (response) => {
        const data = response.json();
        console.log(data);
      },
      (error) => console.log("Deletion failed!!!"),
      () => {
        alert('Article deleted!!!');
        this.router.navigate([`/${this.getLoggedInUsername()}`]);
      }
    );
  }

}
