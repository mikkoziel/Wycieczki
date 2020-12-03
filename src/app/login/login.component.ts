import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Credentials } from '../interfaces/user';
import firebase from 'firebase/app';
import { BehaviorSubject, of } from 'rxjs';
import { DbService } from '../services/db.service';
import { WycieczkiServiceService } from '../services/wycieczki-service.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mail: any;
  password: any;
  user = null;//: firebase.User = null;

  userEmitter = new BehaviorSubject<firebase.User>(this.user);   

  constructor(private authService: AuthService,
    private wycieczkiService: WycieczkiServiceService,
    private dbService: DbService) { }

  ngOnInit(): void {
    this.getData();
    this.getUser();
  }

  getUser(): void{
    this.authService.uid.pipe(
      mergeMap(user =>{
        if(user != null){
          let admin = this.dbService.getAdminObject(user);
          console.log(admin);
          let userOb = this.dbService.getUserObject(user);
          console.log(admin);
          return admin ? admin : (userOb ? userOb : of(null));
        }
        return of(null);
      })
    ).subscribe(x=> {
      console.log(x);
      this.assignAndEmmitUser(x);
    });
    // subscribe(user => {
    //   console.log(user);
    //   if(user != null){
    //     this.authService.isAdmin.pipe(first()).subscribe(x=>{
    //       if(x){
    //         // console.log("admin");
    //         this.dbService.getAdminObject(user).pipe(first()).subscribe((x :any)=> {console.log("admin");this.assignAndEmmitUser(x)});
    //       } else{
    //         // console.log("user");
    //         this.dbService.getUserObject(user).pipe(first()).subscribe((x :any)=> {console.log("user");this.assignAndEmmitUser(x)});
    //       }
    //     })
    //   } else {
    //     console.log("tutaj")
    //     this.assignAndEmmitUser(null);
    //   }
    // });
  }

  assignAndEmmitUser(x:any){
    if(x){
    this.user = x.mail;
    }else{
      this.user = null;
    }
    this.userEmitter.next(this.user);
    // console.log(this.user);
  }

  login(){
    this.authService.login(this.mail, this.password)//.then((x) =>{
      // this.getUser();
    //});
  }

  logout(){
    this.authService.logout().then((x) => {
      // this.getUser(); 
      // console.log(this.user);
    });
  }

  getData(){
    // var wycieczki = this.dbService.getWycieczkaList('wycieczki');//.subscribe(x =>
    // console.log(wycieczki);
    // console.log(this.dbService.data);
    // var wycieczki = this.dbService.
    // this.wycieczkiService.getWycieczkiObDB().subscribe(x => {
    //   console.log(x);
    // });
  }

}
