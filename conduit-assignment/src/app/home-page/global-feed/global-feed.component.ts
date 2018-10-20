import { Component, OnInit } from '@angular/core';
import { GlobalFeedService } from './global-feed.service';
import { SignInService } from 'src/app/sign-in/sign-in.service';
import { AuthService } from 'src/app/sign-in/auth.service';
import { LikeUnlikeArticleService } from 'src/app/like-unlike-article.service';
import { Router } from '@angular/router';
import { GetTagsService } from '../get-tags.service';

@Component({
  selector: 'app-global-feed',
  templateUrl: './global-feed.component.html',
  styleUrls: ['./global-feed.component.css']
})
export class GlobalFeedComponent implements OnInit {

  feeds = [];
  
  p: number = 1;

  tagList: string[];

  constructor(private globalFeedService: GlobalFeedService, private authService: AuthService, private likeUnlikeArticleService: LikeUnlikeArticleService, private router: Router, private getTagsService: GetTagsService) { }

  isSignedIn = false;

  isArticleFavorited: boolean;

  isGlobalFeedSelected = false;

  ngOnInit() {

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
        this.feeds = data.articles;
      }
    );

    this.getTagsService.get().subscribe(
      (response) => {
        this.tagList = response.json().tags;
        console.log(this.tagList);
      }
    )
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

    let favoritesButton = document.getElementById('favoritesCountButton');
    this.isArticleFavorited = article.favorited;
    console.log(article);

    if (this.isSignedIn) {
      if (this.isArticleFavorited) {
        
        console.log('Unliking article');
        favoritesButton.classList.replace('isFavorited', 'btn-outline-success')
          this.isArticleFavorited = false;
          this.likeUnlikeArticleService.unlikeArticle(article.slug).subscribe(
          (response) => {
            const data = response.json().article;
            console.log(data);
          }
        );
      } else {
        console.log('Liking article');
        favoritesButton.classList.replace('btn-outline-success', 'isFavorited')
        this.isArticleFavorited = true;
        this.likeUnlikeArticleService.likeArticle(article.slug).subscribe(
          (response) =>{
            const data = response.json().article;
            console.log(data);
          }
        );
      }
      console.log(article);
    }
    else {
      this.router.navigate(['/login']);
    }
  }
}
