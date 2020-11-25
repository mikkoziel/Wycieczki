import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs';
import { WycieczkaData } from '../Interfaces/wycieczkaData';
import { WycieczkiServiceService } from '../Services/wycieczki-service.service'

@Component({
  selector: 'app-lista-wycieczek',
  templateUrl: './lista-wycieczek.component.html',
  styleUrls: ['./lista-wycieczek.component.css']
})

export class ListaWycieczekComponent implements OnInit {
  ListaWycieczek: WycieczkaData[];
  public show_form: boolean = false;

  minPrice = 0;
  minPrice_subscription: Subscription;
  maxPrice = 0;
  maxPrice_subscription: Subscription;
  startDate: Date;
  startDate_subscription: Subscription;
  endDate: Date;
  endDate_subscription: Subscription;
  countries: String[];
  countries_subscription: Subscription;

  
  constructor(private WycieczkiService: WycieczkiServiceService) { 
    // this.WycieczkiService.initSeatsTaken();
    // this.minPrice = this.WycieczkiService.getMinPrice();
    // this.minPrice_subscription = this.WycieczkiService.minPriceChange.subscribe((value) => {
    //   this.minPrice = value;
    // });
    // this.maxPrice = this.WycieczkiService.getMaxPrice();
    // this.maxPrice_subscription = this.WycieczkiService.maxPriceChange.subscribe((value) => {
    //   this.maxPrice = value;
    // });
    // this.startDate = this.WycieczkiService.getMinStartDate();
    // this.startDate_subscription = this.WycieczkiService.startDateChange.subscribe((value) => {
    //   this.startDate = value;
    // });
    // this.endDate = this.WycieczkiService.getMaxEndDate();
    // this.endDate_subscription = this.WycieczkiService.endDateChange.subscribe((value) => {
    //   this.endDate = value;
    // });
    // this.countries = this.WycieczkiService.getCountries();
    // this.countries_subscription = this.WycieczkiService.countriesChange.subscribe((value) => {
    //   this.countries = value;
    // });
  }

  ngOnInit(): void { 
    this.getWycieczki();
    // console.log(this.WycieczkiService.wycieczki);
    // console.log(this.ListaWycieczek);
  }
  
  ngOnDestroy() {
    // this.minPrice_subscription.unsubscribe();
    // this.maxPrice_subscription.unsubscribe();
    // this.startDate_subscription.unsubscribe();
    // this.endDate_subscription.unsubscribe();
  }

  deleteWycieczka(wycieczkaDEL: WycieczkaData){
    this.ListaWycieczek = this.ListaWycieczek.filter(w=> w !== wycieczkaDEL);
    this.WycieczkiService.removeProduct(wycieczkaDEL).subscribe();
  }
  
  // getWycieczki(): Observable<WycieczkaData[] {
  //   this.WycieczkiService.getProducts()
  //         .subscribe(wycieczki =>this.ListaWycieczek = wycieczki);
  // }

  getWycieczki(): void {
    this.WycieczkiService.getProducts()
          .subscribe(wycieczki =>{this.ListaWycieczek = wycieczki;
            // this.convertDates();
            console.log(this.ListaWycieczek[0].startDate instanceof Date)});
  }

  showWycieczki(){
    this.WycieczkiService.getProduct(0)
          .subscribe(wycieczki =>console.log(wycieczki));
    console.log(this.WycieczkiService.getProduct(0));
  }

  getBorder(wycieczka: WycieczkaData){
    // if(wycieczka.price == this.getMaxPrice()){
    //   return "5px solid green";
    // }
    // else if(wycieczka.price == this.getMinPrice()){
    //   return "5px solid red";
    // }
    // else{
      return "1px solid black";
    // }
  }

  // getMaxPrice(){
  //   return this.WycieczkiService.getMaxPrice();
  // }

  // getMinPrice(){
  //   return this.WycieczkiService.getMinPrice();
  // }
   
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