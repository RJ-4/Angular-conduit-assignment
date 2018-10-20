import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from '../sign-in/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnfollowUserService {

  constructor(private http: Http, private authService: AuthService) { }

  unfollowUser(username: string){
    return this.http.delete(`https://conduit.productionready.io/api/profiles/${username}/follow`,this.authService.getHeaders());
  }
}
