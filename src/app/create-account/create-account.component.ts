import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Credentials } from '../interfaces/user';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  mail: string;
  password: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  register(){
    this.authService.register(<Credentials>
      {email: this.mail, 
      password: this.password})
  }

}
