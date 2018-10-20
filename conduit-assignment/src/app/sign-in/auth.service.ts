import { Injectable } from '@angular/core';
import { SignInService } from './sign-in.service';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthService {

  constructor(private signInService: SignInService, private http: Http) { }

  isLoggedIn(){
    if(window.localStorage.getItem(this.signInService.authKey)){
      return true;
    }
    return false;
  }

  private loggedInUser;

  getHeaders(){

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': `Token ${window.localStorage.getItem(this.signInService.authKey)}`
    });

    return {headers:headers};
  }

  getLoggedInUser(){
    return this.http.get("https://conduit.productionready.io/api/user", this.getHeaders());
  }
}
