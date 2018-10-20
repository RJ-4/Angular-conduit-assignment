import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class GetSelectedUserService {

  constructor(private http: Http, private route: ActivatedRoute) { }

  username: string;

  getUserProfile(username: string){
    return this.http.get(`https://conduit.productionready.io/api/profiles/${username}`);
  }

  setUserName(username){
    this.username = username;
  }

  getUsername(){
    return this.username;
  }
}
