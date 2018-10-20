import { Component, OnInit } from '@angular/core';
import { SignInService } from '../sign-in/sign-in.service';
import { Router } from '@angular/router';
import { AuthService } from '../sign-in/auth.service';
import { NgForm } from '@angular/forms';
import { UpdateUserService } from './update-user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  loggedInUser;

  getLoggedInUser(){
    if(this.loggedInUser){
      return this.loggedInUser;
    }
  }

  constructor(private router: Router, private signInService: SignInService, private authService:AuthService, private updateUserService: UpdateUserService) { }

  ngOnInit() {
    this.loggedInUser = this.authService.getLoggedInUser()
    .subscribe(
      (response) => {
        this.loggedInUser = response.json().user;
      }
    );
  }

  onUpdate(form: NgForm){
    
    let updatedUser: {'user': {'email': string, 'bio'?: string, 'image'?: string, 'username': string, 'password'?: string}}

    if(form.value.password === ''){
      updatedUser = {
        'user': {
          'email': (form.value.email === '') ? this.getLoggedInUser().email: form.value.email,
          'bio': (form.value.bio === '') ? this.getLoggedInUser().bio: form.value.bio,
          'image': (form.value.imageUrl === '') ? this.getLoggedInUser().image: form.value.imageUrl,
          'username': (form.value.username === '') ? this.getLoggedInUser().username: form.value.username,
        }
      };
    } else {
      updatedUser = {
        'user': {
          'email': (form.value.email === '') ? this.getLoggedInUser().email: form.value.email,
          'bio': (form.value.bio === '') ? this.getLoggedInUser().bio: form.value.bio,
          'image': (form.value.image === '') ? this.getLoggedInUser().image: form.value.image,
          'username': (form.value.username === '') ? this.getLoggedInUser().username: form.value.username,
          'password': form.value.password
        }
      };
    }

    this.updateUserService.updateUserSettings(updatedUser);
    
  }

  onLogout(){
    window.localStorage.removeItem(this.signInService.authKey);
    this.router.navigate(['/']);
  }
}
