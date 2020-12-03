import { Injectable } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';
import { Observable } from 'rxjs/index';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Credentials } from '../interfaces/user';
import { DbService } from './db.service';

@Injectable({providedIn: 'root'})
export class AuthService {
    
  uid = this.fireAuth.authState.pipe(
    map(authState => {
      if (!authState) {
        console.log("BUMBUm")
        return null;
      } else {
        console.log(authState.uid)
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
        // return  this.getAdminObject(user.uid) != null ? of(true): of(false);
        return this.checkAdmin(user.uid);
      }
    })
  );

  readonly authState$: Observable<firebase.User | null> = this.fireAuth.authState;
  
  constructor(private _fireAuth: AngularFireAuth,
    private dbService: DbService) {
      this.isAdmin.subscribe(x=>console.log("isAdmin: " + x));
    }

  public get fireAuth(){
    return this._fireAuth;
  }

  public getAdminObject(uid: string){
    return this.dbService.getAdminObject(uid);
  }

  getUserObject(uid: string){
    return this.dbService.getUserObject(uid);
  }

  checkAdmin(uid: string){
    return this.getUserObject(uid).pipe(
      map((x: any)=>{
        return x.admin;
      })
    )
  }
  
  // get user(): Observable<firebase.User | null> {
  //   return this.fireAuth.user;
  // }

  // async login({email, password}: Credentials) {
  //   const session = "session";
  //   await this.fireAuth.setPersistence(session);
  //   return this.fireAuth.signInWithEmailAndPassword(email, password);
  // }

  login(email, password) {
     return this.fireAuth.signInWithEmailAndPassword(email, password
      ).then(value => {
        // console.log(value)
        console.log("Logged: " + value.user.email );
        
        // console.log(this.fireAuth.authState);
        // this.fireAuth.authState.subscribe(x=> console.log(x));
        // this.uid.subscribe(uid => this.koszykService.getOrCreateCart(uid))
      })
      .catch(err => {
        console.log("Login error\n")
      });
    // })
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