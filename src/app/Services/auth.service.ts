import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';
import { Observable } from 'rxjs/index';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Credentials, User } from '../interfaces/user';
import { DbService } from './db.service';

@Injectable({providedIn: 'root'})
export class AuthService {

  currentUser: User;
    
  uid = this.fireAuth.authState.pipe(
    map(authState => {
      if (!authState) {
        this.currentUser = null;
        return null;
      } else {
        this.currentUser = <User>{
          uid: authState.uid
        }
        return authState.uid;
      }
    })
  )

  isAdmin: Observable<boolean> = this.fireAuth.authState.pipe(
    switchMap(user => {
      if(!user) {
        return of(false);
      } else {
        console.log(user.uid)
          return this.checkAdmin(user.uid);
      }
    })
  );

  readonly authState$: Observable<firebase.User | null> = this.fireAuth.authState;
  
  constructor(private _fireAuth: AngularFireAuth,
    private dbService: DbService) {
      this.isAdmin.subscribe(x=>console.log("isAdmin: " + x));
      this.setCurrentUser();
     }

  public get fireAuth(){
    return this._fireAuth;
  }

  getUserObject(uid: string){
    return this.dbService.getUserObjectObsBool(uid);
  }

  checkAdmin(uid: string){
    return this.getUserObject(uid).pipe(
      map((x: any)=>{
        return x.admin;
      })
    )
  }

  getUserObs(): any{
    return this.uid.pipe(
      mergeMap(user =>{
        if(user != null){
          let userOb = this.dbService.getUserObjectObsBool(user);
          return userOb ? 
            userOb
            : of(null);
        }
        return of(null);
      })
    )
  }

  setCurrentUser(){
    var a = this.getUserObs()
    a.subscribe((x: any)=>{
      if(x){
        this.currentUser = <User>{
          mail: x.mail,
          admin: x.admin,
          cart: [],
          orders: []
        }
      } else {
        this.currentUser = null;
      }
      console.log(a)
      console.log(this.currentUser);
    })
  }
  

  login(email: string, password: string) {
     return this.fireAuth.signInWithEmailAndPassword(email, password
      ).then(value => {
        this.fireAuth.setPersistence('session');
       })
      .catch(err => {
        console.log("Login error\n")
      });
  }

  register({email, password}: Credentials) {
    return this.fireAuth.createUserWithEmailAndPassword(email,password)
    .catch(err => {
      console.log("Registration error\n")
    });
  }
  
  logout(): Promise<void> {
    return this.fireAuth.signOut();
  }
}