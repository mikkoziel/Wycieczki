import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuCollapsed = true;
  isAdmin: boolean;

  constructor(private auth:AuthService){

  }
  
  ngOnInit(): void {  
    this.auth.isAdmin.subscribe(x=> this.isAdmin = x);
    // console.log(this.isAdmin)
  }
  
}
