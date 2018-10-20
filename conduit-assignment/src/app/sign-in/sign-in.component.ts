import { Component, OnInit } from '@angular/core';
import { SignInService } from './sign-in.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private signInService: SignInService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;

    const signInUser: {'user': {'email': string, 'password': string }} = {
      'user':{
        'email': email,
        'password': password
      }
    };

    this.signInService.signIn(signInUser);//.subscribe(
    //   (response) => {
    //     const signedInUser = response.json();
    //     console.log(signedInUser);
    //   },
    //   (error) => console.log('Sign In Failed!!!'),
    //   () => {
    //     form.reset();
    //     this.router.navigate(['/']);
    //   }      
    // );
  }

}
