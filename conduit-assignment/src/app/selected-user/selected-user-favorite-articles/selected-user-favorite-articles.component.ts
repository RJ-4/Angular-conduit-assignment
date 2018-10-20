import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Params, ActivatedRoute } from '@angular/router';
import { GetSelectedUserService } from '../get-selected-user.service';

@Component({
  selector: 'app-selected-user-favorite-articles',
  templateUrl: './selected-user-favorite-articles.component.html',
  styleUrls: ['./selected-user-favorite-articles.component.css']
})
export class SelectedUserFavoriteArticlesComponent implements OnInit {

  constructor(private http: Http, private route: ActivatedRoute, private getSelectedUserService: GetSelectedUserService) { }

  username: string;

  getUsername(){
    if(this.username) {
      return this.username;
    }
  }

  favoritedArticles;
  isFavoritedArticlesLoaded: Promise<boolean>;

  ngOnInit() {

    this.username = this.getSelectedUserService.getUsername();

    this.http.get(`https://conduit.productionready.io/api/articles?favorited=${this.getUsername()}`).subscribe(
      (response) => {
        this.favoritedArticles = response.json().articles;
        this.isFavoritedArticlesLoaded = Promise.resolve(true);
      }
    );
  }

}
