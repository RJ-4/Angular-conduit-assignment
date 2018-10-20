import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthService } from '../sign-in/auth.service';

@Injectable()
export class UpdateUserService {

  constructor(private http: Http, private router: Router, private authService: AuthService) { }

  updateUserSettings(updatedUser: {'user': {'email': string, 'bio'?: string, 'image'?: string, 'username': string, 'password'?: string}}){

    this.http.put('https://conduit.productionready.io/api/user', updatedUser, this.authService.getHeaders()).subscribe(
      (response) => {
        const data = response.json();
      },
      (error) => console.log('Updation failed'),
      () => {
        alert('User settings updated!!!');
        this.router.navigate(['/']);
      }
    )

  }
  
}
