import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { GetSelectedUserService } from '../get-selected-user.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-selected-user-all-feeds',
  templateUrl: './selected-user-all-feeds.component.html',
  styleUrls: ['./selected-user-all-feeds.component.css']
})
export class SelectedUserAllFeedsComponent implements OnInit {

  constructor(private http: Http, private route: ActivatedRoute, private getSelectedUserService: GetSelectedUserService) { }

  username: string;

  allUserArticles;

  isShowFavoriteArticles = false;

  allUserArticlesLoaded: Promise<boolean>;

  getUsername(){
    if(this.username){
      return this.username;
    }
  }

  getAllUserArticles(){
    if(this.allUserArticles){
      return this.allUserArticles;
    }
  }

  ngOnInit() {
    
    this.username = this.getSelectedUserService.getUsername()

    this.http.get(`https://conduit.productionready.io/api/articles?author=${this.getUsername()}`).subscribe(
      (response) => {
        this.allUserArticles = response.json().articles;
        this.allUserArticlesLoaded = Promise.resolve(true);
      }
    )
  }

  showMyArticles(){
    this.isShowFavoriteArticles = false;

    let favArticlesTab = document.querySelector('.favorite-articles');
    let myArticlesTab = document.querySelector('.my-articles');

    if(favArticlesTab.classList.contains('tabActive')){
      myArticlesTab.classList.replace('tabInactive', 'tabActive');
      favArticlesTab.classList.replace('tabActive', 'tabInactive');
    }
  }

  showFavoriteArticles(){
    this.isShowFavoriteArticles = true;
    
    let favArticlesTab = document.querySelector('.favorite-articles');
    let myArticlesTab = document.querySelector('.my-articles');

    if(myArticlesTab.classList.contains('tabActive')){
      myArticlesTab.classList.replace('tabActive', 'tabInactive');
      favArticlesTab.classList.replace('tabInactive', 'tabActive');
    }
    
  }

}
