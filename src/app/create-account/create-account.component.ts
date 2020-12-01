import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  mail: string;
  password: string;

  constructor() { }

  ngOnInit(): void {
  }

  register(){

  }

}
