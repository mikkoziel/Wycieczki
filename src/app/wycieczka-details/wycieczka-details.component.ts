import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { add, parseISO } from 'date-fns';

import { WycieczkaData } from '../Interfaces/wycieczkaData';
import { KoszykService } from '../Services/koszyk.service';
import { WycieczkiServiceService } from '../Services/wycieczki-service.service';
import { DateRange, Order } from '../Interfaces/order';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-wycieczka-details',
  templateUrl: './wycieczka-details.component.html',
  styleUrls: ['./wycieczka-details.component.css']
})
export class WycieczkaDetailsComponent implements OnInit {
  id: number;
  data: WycieczkaData;
  sub: Subscription;
  author: string; 
  comment:string;
  seats_taken: Order[];
  rangeValue: DateRange;
  rangeDates: DateRange[];

  constructor(private _Activatedroute:ActivatedRoute,
      private wycieczkiService: WycieczkiServiceService,
      private koszykService: KoszykService) { 
  }

  ngOnInit(): void {     
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
      this.id = Number(params.get('id')); 
      this.wycieczkiService.getProduct(this.id)
          .subscribe(product=>{
            this.data = product;
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
  }

  freeSeat(){
    this.wycieczkiService.freeSeat(this.data, this.rangeValue.id);  
    this.koszykService.freeFromCart(this.data);
    this.seats_taken.forEach(x=>{
      x.quantity = this.koszykService.getSeatsOfProduct(x.wycieczka.id, x.startDate, x.endDate);
    })
  }

  submitComment(){
    this.wycieczkiService.addComment(this.data, this.author, this.comment);
  }

}
