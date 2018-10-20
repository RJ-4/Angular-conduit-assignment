import { Component, OnInit } from '@angular/core';
import { GlobalFeedService } from 'src/app/home-page/global-feed/global-feed.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/sign-in/auth.service';
import { DeleteArticleService } from 'src/app/new-article/delete-article.service';

@Component({
  selector: 'app-selected-feed-header',
  templateUrl: './selected-feed-header.component.html',
  styleUrls: ['./selected-feed-header.component.css']
})
export class SelectedFeedHeaderComponent implements OnInit {

  feeds = [];
  slug: string;

  constructor(private globalFeedService: GlobalFeedService, private route: ActivatedRoute, private authService: AuthService, private router: Router, private deleteArticleService: DeleteArticleService) { }

  isSignedIn: boolean = false;

  loggedInUser;

  getLoggedInUsername(){
    if(this.loggedInUser){
      return this.loggedInUser;
    }
  }

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
        this.loggedInUser = response.json().user.username;
        console.log(this.loggedInUser);
      }
    )
  }

  onEditArticle(slug: string){
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
