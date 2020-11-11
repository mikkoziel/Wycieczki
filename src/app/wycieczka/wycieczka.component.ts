import { Component, OnInit, Input, Inject } from '@angular/core';

@Component({
  selector: 'app-wycieczka',
  templateUrl: './wycieczka.component.html',
  styleUrls: ['./wycieczka.component.css']
})
export class WycieczkaComponent implements OnInit {
  // id:number;
  @Input() data: WycieczkaData;
  // @Input() name: string;
  // @Input() country: string;
  // @Input() start_date: Date;
  // @Input() end_date: Date;
  // @Input() price: number;
  // currency: string;
  // @Input() seats: number;
  // @Input() desc: string;
  // @Input() image_url: string;
  // avaible_seats: number;
  // plus_show: boolean;
  // minus_show:boolean;

  // constructor(id:number){
  //   this.id = id;
  // }

  constructor(@Inject(WycieczkaData) data){
    this.data = data;
  }
  // constructor(name: string, country: string, start_date: Date, end_date: Date, price: number, seats: number, desc: string, image_url: string) {
  //   this.name = name;
  //   this.country = country;
  //   this.start_date = start_date;
  //   this.end_date = end_date;
  //   this.price = price;
  //   this.currency = "PLN";
  //   this.seats = seats;
  //   this.desc = desc;
  //   this.image_url = image_url;
  //   this.avaible_seats = seats;
  //   this.plus_show = true;
  //   this.minus_show = false;
  // }

  ngOnInit(): void {
  }

  reserveSeat(){
    this.data.avaible_seats = this.data.avaible_seats - 1;

    if(this.data.avaible_seats != this.data.seats){
      this.data.minus_show = true;
    }
    if(this.data.avaible_seats == 0){
      this.data.plus_show = false;
    }
    // alert("You were added to this wycieczka");
  }

  freeSeat(){
    this.data.avaible_seats = this.data.avaible_seats + 1;
    if(this.data.avaible_seats == this.data.seats){
      this.data.minus_show = false;
    }      
    if(this.data.avaible_seats != 0){
      this.data.plus_show = true;
    }
    // alert("you freed a seat");
  }

}

class WycieczkaData{
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
