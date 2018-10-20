import { Component, OnInit } from '@angular/core';
import { SignUpService } from './sign-up.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  constructor(private signUpService: SignUpService, private router: Router) { }

  ngOnInit() {
    
  }

  onSubmit(form: NgForm){
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;

    const signUpUser: {'user': {'username': string, 'email': string, 'password': string }} = {
      'user': {
        'username': username,
        'email': email,
        'password': password
      }
    }
    this.signUpService.signUp(signUpUser);
  }
}
