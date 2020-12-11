import { Component, OnInit, Input } from '@angular/core';
import { forEachChild } from 'typescript';
import { User } from '../interfaces/user';
import { WycieczkaData } from '../interfaces/wycieczkaData';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-ocena',
  templateUrl: './ocena.component.html',
  styleUrls: ['./ocena.component.css']
})
export class OcenaComponent implements OnInit {
  @Input() wycieczka: WycieczkaData;
  readonly = true;
  user: User;
  rating: number = 0;
  
  constructor(private auth:AuthService,
    private db: DbService) {
    this.auth.currentUser?.subscribe(x=> {
      this.user = x;
      x.orders.forEach(a=>{
        if(a.wycieczka.id == this.wycieczka.id && !a.rating){
          this.readonly = false;
        }
      })
    })
  }

  ngOnInit(): void {
  }

  onRateChange(rate: any){
    console.log(rate)    
    this.user.orders.forEach(a=>{
      if(a.wycieczka.id == this.wycieczka.id){
        a.rating = rate;
      }
    })
    this.wycieczka.rating = (this.wycieczka.rating * this.wycieczka.rating_count + rate)/(this.wycieczka.rating_count + 1) 
    this.wycieczka.rating_count++;

    this.db.updateUserObject(this.user.uid, this.user)
    this.db.updateWycieczkaId(this.wycieczka)
  }

}
