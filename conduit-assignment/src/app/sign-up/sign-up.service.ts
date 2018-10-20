import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class SignUpService {

  constructor(private http: Http, private router: Router) { }

  token;
  authKey = "authUserToken";

  currentUser;

  signUp(signUpUser: {'user': {'username': string, 'email': string, 'password': string }}){
    this.http.post('https://conduit.productionready.io/api/users', signUpUser)
    .subscribe(
      (response) => {
        this.currentUser = response.json();
        console.log(this.currentUser);
        this.token = this.currentUser.user.token;
        window.localStorage.setItem(this.authKey, this.token);
      },
      (error) => console.log('Sign Up falied!!!'),
      () => {
        if (this.token) {
          this.router.navigate(["/"]);
        } else {
          console.log("Sign in Authentication failed");
        }
      }
    );
  }
}
