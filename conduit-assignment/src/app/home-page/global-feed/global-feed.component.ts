import { Component, OnInit } from '@angular/core';
import { GlobalFeedService } from './global-feed.service';
import { SignInService } from 'src/app/sign-in/sign-in.service';
import { AuthService } from 'src/app/sign-in/auth.service';
import { LikeUnlikeArticleService } from 'src/app/like-unlike-article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-global-feed',
  templateUrl: './global-feed.component.html',
  styleUrls: ['./global-feed.component.css']
})
export class GlobalFeedComponent implements OnInit {

  feeds = [];
  constructor(private globalFeedService: GlobalFeedService, private authService: AuthService, private likeUnlikeArticleService: LikeUnlikeArticleService, private router: Router) { }

  isSignedIn = false;

  isFavoritesButtonClicked = false;

  isFavoriteCountIncreased = false;

  favoritesCount: number;

  isGlobalFeedSelected = false;

  getFavoritesCount(){
    if(this.favoritesCount){
      return this.favoritesCount;
    }
  }

  ngOnInit() {

    this.isFavoritesButtonClicked = false;

    this.isSignedIn = this.authService.isLoggedIn();

    if(!this.isSignedIn){
      this.isGlobalFeedSelected = true;

      let globalFeedTab = document.querySelector('.globalFeedTab');
      globalFeedTab.classList.replace('tabInactive', 'tabActive');
    }

    this.globalFeedService.getGlobalFeed()
    .subscribe(
      (response) => {
        const data = response.json();
        console.log(data);
        this.feeds = data.articles;
      }
    );
  }

  onSelectYourFeed(){
    this.isGlobalFeedSelected = false;

    let yourFeedTab = document.querySelector('.yourFeedTab');
    let globalFeedTab = document.querySelector('.globalFeedTab');

    if(yourFeedTab.classList.contains('tabInactive')){
      yourFeedTab.classList.replace('tabInactive', 'tabActive');
      globalFeedTab.classList.replace('tabActive', 'tabInactive');
    }
  }

  onSelectGlobalFeed(){
    this.isGlobalFeedSelected = true;

    let yourFeedTab = document.querySelector('.yourFeedTab');
    let globalFeedTab = document.querySelector('.globalFeedTab');

    if(globalFeedTab.classList.contains('tabInactive')){
      globalFeedTab.classList.replace('tabInactive', 'tabActive');
      yourFeedTab.classList.replace('tabActive', 'tabInactive');
    }
  }

  onLikeArticle(article){

    console.log(article);
    this.isFavoritesButtonClicked = true;
    this.favoritesCount = article.favoritesCount;

    if (this.isSignedIn) {
      if (article.favorited) {
        console.log('Unliking article');
        this.favoritesCount--;
        this.isFavoriteCountIncreased = false;
        article.favorited = false;
        this.likeUnlikeArticleService.unlikeArticle(article.slug).subscribe(
          (response) => {
            const data = response.json().article;
            console.log(data);
            this.isFavoritesButtonClicked = false;
          }
        );
      } else {
        console.log('Liking article');
        article.favorited = true;
        this.favoritesCount++;
        this.isFavoriteCountIncreased = true;
        this.likeUnlikeArticleService.likeArticle(article.slug).subscribe(
          (response) =>{
            const data = response.json().article;
            console.log(data);
            this.isFavoritesButtonClicked = false;
          }
        );
      }
    }
    else {
      this.router.navigate(['/login']);
    }
  }
}
