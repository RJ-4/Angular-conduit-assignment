import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/sign-in/auth.service';
import { GetFeedsService } from './get-feeds.service';

@Component({
  selector: 'app-your-feed',
  templateUrl: './your-feed.component.html',
  styleUrls: ['./your-feed.component.css']
})
export class YourFeedComponent implements OnInit {

  constructor(private authService: AuthService, private getFeedsService: GetFeedsService) { }

  yourFeedsLoaded: Promise<boolean>;
  yourFeeds;

  getYourFeeds(){
    if(this.yourFeeds){
      return this.yourFeeds;
    }
  }

  ngOnInit() {

    this.getFeedsService.getFeeds().subscribe(
      (response) => {
        this.yourFeeds = response.json().articles;
        console.log(this.yourFeeds);
        this.yourFeedsLoaded = Promise.resolve(true);
      }
    )

  }

}
