import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { WycieczkaData } from '../wycieczkaData';
import { WycieczkiServiceService } from '../wycieczki-service.service'

@Component({
  selector: 'app-lista-wycieczek',
  templateUrl: './lista-wycieczek.component.html',
  styleUrls: ['./lista-wycieczek.component.css']
})

export class ListaWycieczekComponent implements OnInit {
  ListaWycieczek = [];
  public show_form: boolean = false;
  
  constructor(private WycieczkiService: WycieczkiServiceService) {  }

  ngOnInit(): void { 
    this.getWycieczki();
  }

  deleteWycieczka(wycieczkaDEL: WycieczkaData){
    this.ListaWycieczek = this.WycieczkiService.deleteProduct(wycieczkaDEL);
  }

  getWycieczki(): void {
    this.ListaWycieczek = this.WycieczkiService.getProducts();
  }

  addWycieczka(wycieczkaADD: WycieczkaData){
    this.ListaWycieczek = this.WycieczkiService.addProduct(wycieczkaADD);
  }

  getBorder(wycieczka: WycieczkaData){
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
   
  getReservedSeats(){
    let reserved = this.getAllSeats() - this.getAllAvailableSeats();
    return reserved;
  }

  getAllSeats(){
    let sum = 0;
    this.ListaWycieczek.forEach(function(value){
      sum = sum + value.seats
    })
    return sum;
  }

  getAllAvailableSeats(){
    let sum = 0;
    this.ListaWycieczek.forEach(function(value){
      sum = sum + value.avaible_seats
    })
    return sum;
  }

  getReservedColor(){
    let reserved = this.getReservedSeats();
    if(reserved>10){
      return "green";
    }
    else{
      return "red";
    }
  }

}