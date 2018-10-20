import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/sign-in/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GetSelectedUserService } from '../get-selected-user.service';
import { FollowUserService } from '../follow-user.service';
import { UnfollowUserService } from '../unfollow-user.service';

@Component({
  selector: 'app-selected-user-header',
  templateUrl: './selected-user-header.component.html',
  styleUrls: ['./selected-user-header.component.css']
})
export class SelectedUserHeaderComponent implements OnInit {

  constructor(private authService: AuthService, private route: ActivatedRoute, private getSelectedUserService: GetSelectedUserService, private router: Router, private followUserService: FollowUserService, private unfollowUserService: UnfollowUserService) { }

  isSignedIn: boolean = false;

  username: string;

  loggedInUsername: string;

  userProfile: {
    'username': string,
    'bio': string,
    'image': string,
    'following': boolean
  }

  getUsername(){
    if(this.username){
      return this.username;
    }
  }

  getUserProfile(){
    if(this.userProfile){
      return this.userProfile;
    }
  }

  userProfileLoaded: Promise<boolean>;

  ngOnInit(){
    this.isSignedIn = this.authService.isLoggedIn();

    this.route.params.subscribe(
      (params: Params) => {
        this.username = params['username'];
      }
    );

    this.getSelectedUserService.setUserName(this.getUsername());

    this.getSelectedUserService.getUserProfile(this.getUsername()).subscribe(
      (response) => {
        this.userProfile = response.json().profile;
        this.userProfileLoaded = Promise.resolve(true);
      }
    );

    this.authService.getLoggedInUser().subscribe(
      (response) => {
        this.loggedInUsername = response.json().user.username;
      }
    );
  }

  editProfile(){
    this.router.navigate(['/settings'])
  }

  onClickFollowUser(){
    console.log(this.getUserProfile().following);
    this.followUserService.followUser(this.getUsername()).subscribe(
      (response) => {
      this.userProfile = response.json().profile;
        console.log(this.userProfile);
      },
      (error) => console.log('Unable to follow user!!!'),
      () => {
        console.log(this.getUserProfile());
      }
    );
  }

  onClickUnfollowUser(){
    console.log(this.getUserProfile().following);
    this.unfollowUserService.unfollowUser(this.getUsername()).subscribe(
      (response) => {
        this.userProfile = response.json().profile;
        console.log(this.userProfile);
      },
      (error) => console.log('Unable to unfollow user!!!'),
      () => {
        console.log(this.getUserProfile());
      }
    );
  }
}
