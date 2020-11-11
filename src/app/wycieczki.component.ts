import { Component, OnInit } from '@angular/core';
import { WycieczkaComponent } from './wycieczka/wycieczka.component';
import { ListaWycieczekComponent } from './lista-wycieczek/lista-wycieczek.component';

@Component({
  selector: 'app-root',
  templateUrl: './wycieczki.component.html',
  styleUrls: ['./wycieczki.component.css']
})

export class WycieczkiComponent implements OnInit{
  title = 'Projekt';
  ListaWycieczek: ListaWycieczekComponent;

  constructor() {};

  ngOnInit(): void {
    this.ListaWycieczek = new ListaWycieczekComponent();
    this.addWycieczkiToList();
  }

  addWycieczkiToList(){
    this.ListaWycieczek.addWycieczkaToList("1 wycieczka","Polska",new Date("4-3-2021"),new Date("4-4-2021"), 123, 10, "Lorem ipsum", "./assets/01.png");
    this.ListaWycieczek.addWycieczkaToList("2 wycieczka","Polska",new Date("2-2-2021"),new Date("2-3-2021"), 125, 14, "Lorem ipsum", "./assets/01.png");
    this.ListaWycieczek.addWycieczkaToList("3 wycieczka","Polska",new Date("12-4-2021"),new Date("12-6-2021"), 176, 10, "Lorem ipsum", "./assets/01.png");
    this.ListaWycieczek.addWycieczkaToList("4 wycieczka","Niemcy",new Date("3-1-2021"),new Date("3-3-2021"), 189, 20, "Lorem ipsum", "./assets/02.svg");
    this.ListaWycieczek.addWycieczkaToList("5 wycieczka","Niemcy",new Date("4-1-2021"),new Date("4-6-2021"), 20, 34, "Lorem ipsum", "./assets/02.svg");
    this.ListaWycieczek.addWycieczkaToList("6 wycieczka","Wlk. Brytania",new Date("5-1-2021"),new Date("5-14-2021"), 250, 5, "Lorem ipsum", "./assets/03.png");
    this.ListaWycieczek.addWycieczkaToList("7 wycieczka","Hiszpania",new Date("6-1-2021"),new Date("6-7-2021"), 220, 15, "Lorem ipsum", "./assets/04.svg");
    this.ListaWycieczek.addWycieczkaToList("8 wycieczka","Hiszpania",new Date("7-1-2021"),new Date("7-4-2021"), 211, 13, "Lorem ipsum", "./assets/04.svg");
  }

  // reserveSeat(wycieczka){
  //   wycieczka.reserveSeat();
  // }

  // freeSeat(wycieczka){
  //   wycieczka.freeSeat();
  // }

  // getColor(wycieczka){
  //   if(wycieczka.avaible_seats < 4){
  //     return "red";
  //   }
  //   else{
  //     return 'green';
  //   }
  // }

  // getBorder(wycieczka){
  //   if(wycieczka.price == this.getMaxPrice()){
  //     return "5px solid green";
  //   }
  //   else if(wycieczka.price == this.getMinPrice()){
  //     return "5px solid red";
  //   }
  //   else{
  //     return "1px solid black";
  //   }
  // }

  // getMaxPrice(){
  //   return Math.max.apply(Math, this.ListaWycieczek.map(function(o) { return o.price; }))
  // }

  // getMinPrice(){
  //   return Math.min.apply(Math, this.ListaWycieczek.map(function(o) { return o.price; }))
  // }

  // getReservedSeats(){
  //   let reserved = this.getAllSeats() - this.getAllAvailableSeats();
  //   return reserved;
  // }

  // getAllSeats(){
  //   let sum = 0;
  //   this.ListaWycieczek.forEach(function(value){
  //     sum = sum + value.seats
  //   })
  //   return sum;
  // }

  // getAllAvailableSeats(){
  //   let sum = 0;
  //   this.ListaWycieczek.forEach(function(value){
  //     sum = sum + value.avaible_seats
  //   })
  //   return sum;
  // }

  // getReservedColor(){
  //   let reserved = this.getReservedSeats();
  //   if(reserved>10){
  //     return "green";
  //   }
  //   else{
  //     return "red";
  //   }
  // }
  
}

// export interface Property {
//   key: string;
//   value: string;
// }


// class Wycieczka {
//     name: string;
//     country: string;
//     start_date: Date;
//     end_date: Date;
//     price: number;
//     currency: string;
//     seats: number;
//     desc: string;
//     image_url: string;
//     avaible_seats: number;
//     plus_show: boolean;
//     minus_show:boolean;

//     constructor(name: string, country: string, start_date: Date, end_date: Date, price: number, seats: number, desc: string, image_url: string) {
//       this.name = name;
//       this.country = country;
//       this.start_date = start_date;
//       this.end_date = end_date;
//       this.price = price;
//       this.currency = "PLN";
//       this.seats = seats;
//       this.desc = desc;
//       this.image_url = image_url;
//       this.avaible_seats = seats;
//       this.plus_show = true;
//       this.minus_show = false;
//     }
    
//     reserveSeat(){
//       this.avaible_seats = this.avaible_seats - 1;

//       if(this.avaible_seats != this.seats){
//         this.minus_show = true;
//       }
//       if(this.avaible_seats == 0){
//         this.plus_show = false;
//       }
//       // alert("You were added to this wycieczka");
//     }

//     freeSeat(){
//       this.avaible_seats = this.avaible_seats + 1;
//       if(this.avaible_seats == this.seats){
//         this.minus_show = false;
//       }      
//       if(this.avaible_seats != 0){
//         this.plus_show = true;
//       }
//       // alert("you freed a seat");
//     }
    
// }


