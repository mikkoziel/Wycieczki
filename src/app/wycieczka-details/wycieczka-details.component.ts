import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { add } from 'date-fns';

import { WycieczkaData } from '../interfaces/wycieczkaData';
import { KoszykService } from '../services/koszyk.service';
import { WycieczkiServiceService } from '../services/wycieczki-service.service';
import { DateRange, Order } from '../interfaces/order';
import { DatePipe } from '@angular/common';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-wycieczka-details',
  templateUrl: './wycieczka-details.component.html',
  styleUrls: ['./wycieczka-details.component.css']
})
export class WycieczkaDetailsComponent implements OnInit {
  id: number;
  data: WycieczkaData;
  sub: Subscription;
  author: string = ""; 
  comment:string = "";
  seats_taken: Order[];
  seats_flag = true;
  rangeValue: DateRange;
  rangeDates: DateRange[];

  constructor(private _Activatedroute:ActivatedRoute,
      private wycieczkiService: WycieczkiServiceService,
      private koszykService: KoszykService, 
      private dbService: DbService) { 
  }

  ngOnInit(): void {     
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
      this.id = Number(params.get('id')); 
      this.dbService.getWycieczkaOb(this.id.toString())
      // this.wycieczkiService.getProduct(this.id)
          .subscribe(product=>{
            this.data = product;
            console.log(product)
            this.rangeValue = {
              id: 0,
              startDate: this.data.startDate,
              endDate: this.data.endDate
            }
            if(this.data.cyclic){
              this.rangeDates = new Array(this.data.cyclic.long).fill(null).map((_, i) => {
                return <DateRange>{
                  id: i,
                  startDate:add(this.data.startDate, { days: i*this.data.cyclic.days, 
                                                              weeks: i*this.data.cyclic.weeks, 
                                                              months: i*this.data.cyclic.months}),
                  endDate: add(this.data.endDate, { days: i*this.data.cyclic.days, 
                                                              weeks: i*this.data.cyclic.weeks, 
                                                              months: i*this.data.cyclic.months})
                }
              })
            }
            this.seats_taken = [];
            this.rangeDates.forEach(x=>{
              this.seats_taken.push({
                wycieczka: this.data,
                quantity: this.koszykService.getSeatsOfProduct(this.data.id, x.startDate, x.endDate),
                startDate: x.startDate,
                endDate: x.endDate,
                total_price: this.koszykService.getTotalOrderItemPrice(this.data.id, x.startDate, x.endDate)
              }) 
            })
            
          this.checkFlag();
          });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  reserveSeat(){
    this.wycieczkiService.reserveSeat(this.data, this.rangeValue.id); 
    this.koszykService.addToCart(this.data, this.rangeValue.startDate, this.rangeValue.endDate);
    this.seats_taken.forEach(x=>{
      x.quantity = this.koszykService.getSeatsOfProduct(x.wycieczka.id, x.startDate, x.endDate);
    })
    this.checkFlag();
  }

  freeSeat(){
    this.wycieczkiService.freeSeat(this.data, this.rangeValue.id);  
    this.koszykService.freeFromCart(this.data);
    this.seats_taken.forEach(x=>{
      x.quantity = this.koszykService.getSeatsOfProduct(x.wycieczka.id, x.startDate, x.endDate);
    })
    this.checkFlag();
  }

  submitComment(){
    if(this.author != "" && this.comment != ""){
      this.wycieczkiService.addComment(this.data, this.author, this.comment);
    }
  }
  
  checkFlag(){
    this.seats_flag = true;
    this.seats_taken.forEach(x=>{
      if(x.quantity > 0){
        this.seats_flag = false;
      }
    })
  }

  getImage(path: string){//: Observable<string | null>{
    return this.dbService.getImage(path);
  }

}
