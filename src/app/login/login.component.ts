import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Credentials } from '../interfaces/user';
import firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mail: any;
  password: any;
  user: firebase.User = null;

  userEmitter = new BehaviorSubject<firebase.User>(this.user);   


  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  getUser(){
    this.authService.user.subscribe(user => {
      this.user = user;
      console.log(this.user);
      this.userEmitter.next(this.user);
    });
  }

  login(){
    this.authService.login(<Credentials>{email:this.mail, password:this.password});
    this.getUser();
  }

  logout(){
    this.authService.logout();    
    this.getUser();
  }

}
