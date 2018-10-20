import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Router } from "@angular/router";

@Injectable()
export class SignInService {
 
  token: string;
  authKey = "authUserToken";

  currentUser;

  constructor(
    private http: Http,
    private router: Router,
  ) {}

  signIn(signInUser: { user: { email: string; password: string } }) {
    this.http
      .post("https://conduit.productionready.io/api/users/login", signInUser)
      .subscribe(
        response => {
          this.currentUser = response.json();
          //console.log(this.currentUser);
          this.token = this.currentUser.user.token;
          window.localStorage.setItem(this.authKey, this.token);
        },
        error => console.log("Error during sign in!!!"),

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
