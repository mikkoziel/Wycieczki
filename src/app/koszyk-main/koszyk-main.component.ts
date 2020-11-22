import { Component, OnInit } from '@angular/core';

import { KoszykService } from '../koszyk.service';

@Component({
  selector: 'app-koszyk-main',
  templateUrl: './koszyk-main.component.html',
  styleUrls: ['./koszyk-main.component.css']
})
export class KoszykMainComponent implements OnInit {
  items = [];
  seats_taken: number;
  total_price: number;
  seats_subscription;
  price_subscription;

  constructor(private koszykService: KoszykService) { 
    this.seats_taken = koszykService.seats_taken;
    this.total_price = koszykService.getTotalPrice();
    this.seats_subscription = koszykService.seatsChange.subscribe((value) => {
      this.seats_taken = value;
    })
    this.price_subscription = koszykService.priceChange.subscribe((value) => {
      this.total_price = value;
    })
  }

  ngOnInit(): void {
    this.items = this.koszykService.getItems();
  }

  ngOnDestroy() {
     this.seats_subscription.unsubscribe();
     this.price_subscription.unsubscribe();
   }

}
