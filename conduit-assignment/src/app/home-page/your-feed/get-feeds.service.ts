import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/sign-in/auth.service';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class GetFeedsService {

  constructor(private http: Http, private authService: AuthService) { }

  getFeeds(){
    return this.http.get('https://conduit.productionready.io/api/articles/feed', this.authService.getHeaders());
  }
}
