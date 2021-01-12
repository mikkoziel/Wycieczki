import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mail: any;
  password: any;
  user = null;  
  panelOpenState = false; 

  constructor(private authService: AuthService,
    // private wycieczkiService: WycieczkiServiceService,
    // private dbService: DbService
    ) { }

  ngOnInit(): void {
    this.authService.currentUser
    .subscribe((x: any)=> {
      if(x){
        this.user = x;
      }else{
        this.user = null;
      }
    });
  }

  login(){
    this.authService.login(this.mail, this.password)
  }

  logout(){
    this.authService.logout()
  }

}
