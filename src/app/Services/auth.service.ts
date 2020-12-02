import { Injectable } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from "@angular/fire/auth";
// import {  } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs/index';
import { Credentials } from '../interfaces/user';

@Injectable({providedIn: 'root'})
export class AuthService {
  readonly authState$: Observable<firebase.User | null> = this.fireAuth.authState;
  
  constructor(private fireAuth: AngularFireAuth) {}
  
  get user(): Observable<firebase.User | null> {
    return this.fireAuth.user;
  }

  async login({email, password}: Credentials) {
    const session = "session";
    await this.fireAuth.setPersistence(session);
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  register({email, password}: Credentials) {
    return this.fireAuth.createUserWithEmailAndPassword(email,password)
    .catch(err => {
      const errorCode = err.code;
      const errorMessage = err.message;

      console.error(`${errorCode} Could not log into Firebase: ${errorMessage}`);
    });
  }
  
  logout() {
    return this.fireAuth.signOut();
  }
}