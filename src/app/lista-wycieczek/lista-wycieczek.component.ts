import { Component, OnInit , Input } from '@angular/core';
import { WycieczkaData } from '../wycieczkaData';
import { WycieczkiServiceService } from '../wycieczki-service.service'

@Component({
  selector: 'app-lista-wycieczek',
  templateUrl: './lista-wycieczek.component.html',
  styleUrls: ['./lista-wycieczek.component.css']
})
export class ListaWycieczekComponent implements OnInit {
  ListaWycieczek = [];

  constructor(private WycieczkiService: WycieczkiServiceService) {  }

  ngOnInit(): void { 
    this.getWycieczki();
  }

  deleteWycieczka(wycieczkaDEL: WycieczkaData){
    const result = this.ListaWycieczek.filter(wycieczka => wycieczka.id !== wycieczkaDEL.id);
    this.ListaWycieczek = result;
  }

  getWycieczki(): void {
    this.ListaWycieczek = this.WycieczkiService.getWycieczki();
  }


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

}