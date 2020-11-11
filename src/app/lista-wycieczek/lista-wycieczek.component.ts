import { Component, OnInit , Input } from '@angular/core';
import { WycieczkaData } from '../wycieczkaData';

@Component({
  selector: 'app-lista-wycieczek',
  templateUrl: './lista-wycieczek.component.html',
  styleUrls: ['./lista-wycieczek.component.css']
})
export class ListaWycieczekComponent implements OnInit {
  @Input() ListaWycieczek: Array<WycieczkaData>;

  constructor() { 
    this.ListaWycieczek = new Array<WycieczkaData>();
  }

  ngOnInit(): void {
  }

  addWycieczkaToList(name: string, country: string, start_date: Date, end_date: Date, price: number, seats: number, desc: string, image_url: string){
    this.ListaWycieczek.push(new WycieczkaData(name, country, start_date, end_date, price, seats, desc, image_url));
  }

  getBorder(wycieczka){
    if(wycieczka.price == this.getMaxPrice()){
      return "5px solid green";
    }
    else if(wycieczka.price == this.getMinPrice()){
      return "5px solid red";
    }
    else{
      return "1px solid black";
    }
  }

  getMaxPrice(){
    return Math.max.apply(Math, this.ListaWycieczek.map(function(o) { return o.price; }))
  }

  getMinPrice(){
    return Math.min.apply(Math, this.ListaWycieczek.map(function(o) { return o.price; }))
  }

}

// class Wycieczka {
//   data: WycieczkaData;

//   constructor(name: string, country: string, start_date: Date, end_date: Date, price: number, seats: number, desc: string, image_url: string) {
//     this.data = new WycieczkaData(name, country, start_date, end_date, price, seats, desc, image_url);
//   }
    
//     // reserveSeat(){
//     //   this.avaible_seats = this.avaible_seats - 1;

//     //   if(this.avaible_seats != this.seats){
//     //     this.minus_show = true;
//     //   }
//     //   if(this.avaible_seats == 0){
//     //     this.plus_show = false;
//     //   }
//     //   // alert("You were added to this wycieczka");
//     // }

//     // freeSeat(){
//     //   this.avaible_seats = this.avaible_seats + 1;
//     //   if(this.avaible_seats == this.seats){
//     //     this.minus_show = false;
//     //   }      
//     //   if(this.avaible_seats != 0){
//     //     this.plus_show = true;
//     //   }
//     //   // alert("you freed a seat");
//     // }
    
// }
