import { Component, OnInit } from '@angular/core';
import { AuthService } from '../sign-in/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private authService: AuthService) {}

  isSignedIn: boolean = false;

  ngOnInit(){
    this.isSignedIn = this.authService.isLoggedIn();
  }

}
