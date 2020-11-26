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
  }

  ngOnInit(): void { 
    this.getWycieczki();
  }
  
  ngOnDestroy() {
    this.minPrice_subscription.unsubscribe();
    this.maxPrice_subscription.unsubscribe();
    this.startDate_subscription.unsubscribe();
    this.endDate_subscription.unsubscribe();
  }

  getWycieczki(): void {
    this.WycieczkiService.getProducts()
          .subscribe(wycieczki =>{this.ListaWycieczek = wycieczki;
            this.initSubscriptions(wycieczki)});
  }
  
  deleteWycieczka(wycieczkaDEL: WycieczkaData){
    this.ListaWycieczek = this.ListaWycieczek.filter(w=> w !== wycieczkaDEL);
    this.WycieczkiService.removeProduct(wycieczkaDEL).subscribe();
  }

  initSubscriptions(wycieczki: WycieczkaData[]){
    this.minPrice = this.WycieczkiService.getMinPriceObject(wycieczki);
    this.minPrice_subscription = this.WycieczkiService.minPriceChange.subscribe((value) => {
      this.minPrice = value;
    });
    this.maxPrice = this.WycieczkiService.getMaxPriceObject(wycieczki);
    this.maxPrice_subscription = this.WycieczkiService.maxPriceChange.subscribe((value) => {
      this.maxPrice = value;
    });
    this.startDate = this.WycieczkiService.getMinStartDateObject(wycieczki);
    this.startDate_subscription = this.WycieczkiService.startDateChange.subscribe((value) => {
      this.startDate = value;
    });
    this.endDate = this.WycieczkiService.getMaxEndDateObject(wycieczki);
    this.endDate_subscription = this.WycieczkiService.endDateChange.subscribe((value) => {
      this.endDate = value;
    });
    this.countries = this.WycieczkiService.getCountriesObject(wycieczki);
    this.countries_subscription = this.WycieczkiService.countriesChange.subscribe((value) => {
      this.countries = value;
    });
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
    return this.WycieczkiService.getAllSeatsTaken();
  }

  getAllSeats(){
    return this.WycieczkiService.getAllSeats();
  }

  getAllAvailableSeats(){
    return this.WycieczkiService.getAllAvailableSeats();
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