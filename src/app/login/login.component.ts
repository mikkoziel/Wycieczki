import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Credentials } from '../interfaces/user';
import firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { DbService } from '../services/db.service';
import { WycieczkiServiceService } from '../services/wycieczki-service.service';

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


  constructor(private authService: AuthService,
    private wycieczkiService: WycieczkiServiceService,
    private dbService: DbService) { }

  ngOnInit(): void {
    this.getData();
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

  getData(){
    // var wycieczki = this.dbService.getWycieczkaList('wycieczki');//.subscribe(x =>
    // console.log(wycieczki);
    // console.log(this.dbService.data);
    // var wycieczki = this.dbService.
    this.wycieczkiService.getWycieczkiObDB().subscribe(x => {
      console.log(x);
    });
  }

}
