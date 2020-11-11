import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class WycieczkaData{
    name: string;
    country: string;
    start_date: Date;
    end_date: Date;
    price: number;
    currency: string;
    seats: number;
    desc: string;
    image_url: string;
    avaible_seats: number;
    plus_show: boolean;
    minus_show:boolean;
  
    constructor(name: string, country: string, start_date: Date, end_date: Date, price: number, seats: number, desc: string, image_url: string) {
      this.name = name;
      this.country = country;
      this.start_date = start_date;
      this.end_date = end_date;
      this.price = price;
      this.currency = "PLN";
      this.seats = seats;
      this.desc = desc;
      this.image_url = image_url;
      this.avaible_seats = seats;
      this.plus_show = true;
      this.minus_show = false;
    }
}