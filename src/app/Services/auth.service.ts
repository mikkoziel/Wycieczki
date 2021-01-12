import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { Credentials, User } from '../interfaces/user';
import { DbService } from './db.service';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {

  currentUser: Observable<User> = this.fireAuth.authState.pipe(
    switchMap(user => {
      if(!user) {
        return of(null);
      } else {    
        let x = this.getUserObject(user.uid);
        return x;
      }

    })
  );
    
  uid = this.fireAuth.authState.pipe(
    map(authState => {
      if (!authState) {
        this.currentUser = null;
        return null;
      } else {
        return authState.uid;
      }
    })
  )

  isAdmin: Observable<boolean> = this.fireAuth.authState.pipe(
    switchMap(user => {
      if(!user) {
        return of(false);
      } else {
        // console.log(user.uid)
        return this.checkAdmin(user.uid);
      }
    })
  );

  readonly authState$: Observable<firebase.User | null> = this.fireAuth.authState;
  
  constructor(private _fireAuth: AngularFireAuth,
    private dbService: DbService,
    private router: Router,) {
     }

  public get fireAuth(){
    return this._fireAuth;
  }

  getUserObject(uid: string){
    return this.dbService.getUserObject(uid).pipe(
      map((x:any) =>{
        return <User>{
          admin: x.admin,
          mail: x.mail,
          cart: x.cart ? x.cart : [],
          orders: x.orders ? x.orders : [],
          uid: uid
        }
      })
    );
  }

  checkAdmin(uid: string): Observable<boolean>{
    return this.dbService.getUserObjectObsBool(uid).pipe(
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
            : EMPTY;
        }
        return EMPTY;
      })
    )
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
    .then(value =>{
      this.dbService.addUser({
          admin: false,
          mail: email,
          cart: [],
          orders: [],
          uid: value.user.uid
      })
      this.logout();
      this.router.navigate(["/login"])
    })
    .catch(err => {
      console.log("Registration error\n")
    });
  }
  
  logout(): Promise<void> {
    return this.fireAuth.signOut();
  }
}