import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from '../sign-in/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FollowUserService {

  constructor(private http: Http, private authService: AuthService) { }

  followUser(username: string){
    return this.http.post(`https://conduit.productionready.io/api/profiles/${username}/follow`, {},this.authService.getHeaders());
  }
}
