import { Component, OnInit } from '@angular/core';
import { SignInService } from 'src/app/sign-in/sign-in.service';
import { AuthService } from '../sign-in/auth.service';

@Component({
  selector: 'app-navigation-bar-for-signed-in-user',
  templateUrl: './navigation-bar-for-signed-in-user.component.html',
  styleUrls: ['./navigation-bar-for-signed-in-user.component.css']
})
export class NavigationBarForSignedInUserComponent implements OnInit {

  constructor(private signInService: SignInService, private authService: AuthService) { }

  loggedInUser;

  getLoggedInUserName(){
    if(this.loggedInUser){
      return this.loggedInUser.username;
    }
  }

  ngOnInit() {
    this.authService.getLoggedInUser().subscribe(
      (response) => {
        this.loggedInUser = response.json();
        this.loggedInUser = this.loggedInUser.user;
        console.log(this.loggedInUser);
      }
    );
  }
}
  
