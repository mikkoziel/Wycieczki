import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
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
      x?.orders.forEach(a=>{
        if(a.wycieczka.id == this.wycieczka.id && !a.rating){
          this.readonly = false;
        }
      })
    })
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.wycieczka.currentValue){
      this.rating = this.wycieczka.rating;
    }
    
  }

  onRateChange(rate: any){
    let flag =true;
    this.user.orders.forEach(a=>{
      if(a.wycieczka.id == this.wycieczka.id && !a.rating && flag==true){
        a.rating = rate;
        flag = false;
      }
    })
    let a = this.wycieczka.rating * this.wycieczka.rating_count + rate
    let b = this.wycieczka.rating_count + 1
    let c = a/b
    this.wycieczka.rating = Math.round(c)
    this.wycieczka.rating_count++;

    this.db.updateUserObject(this.user.uid, this.user)
    this.db.updateWycieczkaId(this.wycieczka)
  }

}
