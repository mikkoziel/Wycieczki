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

  constructor() {};

  ngOnInit(): void {
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