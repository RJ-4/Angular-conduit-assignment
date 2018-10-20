import { Component, OnInit } from '@angular/core';
import { GlobalFeedService } from '../home-page/global-feed/global-feed.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-selected-feed',
  templateUrl: './selected-feed.component.html',
  styleUrls: ['./selected-feed.component.css']
})
export class SelectedFeedComponent implements OnInit {

  feeds = [];
  slug: string;

  constructor(private globalFeedService: GlobalFeedService, private route: ActivatedRoute) { }

  ngOnInit() {
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
  }
}
