import { Injectable } from '@angular/core';
import { Wycieczki } from '../mock';
import { WycieczkaData } from '../Interfaces/wycieczkaData'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WycieczkiServiceService {
  wycieczki = [...Wycieczki];

  minPriceFilter: number;
  maxPriceFilter:number;
  startDateFilter: Date;
  endDateFilter: Date;
  countriesFilter: String[];

  minPriceChange: Subject<number> = new Subject<number>();
  maxPriceChange: Subject<number> = new Subject<number>();
  startDateChange: Subject<Date> = new Subject<Date>();
  endDateChange: Subject<Date> = new Subject<Date>();
  countriesChange: Subject<String[]> = new Subject<String[]>();
  
  constructor() { 
    this.minPriceFilter = this.getMinPrice();
    this.maxPriceFilter = this.getMaxPrice();
  }

  getProducts(): WycieczkaData[]{
    return this.wycieczki;
  }

  getProduct(id: number): WycieczkaData | undefined{
    return this.wycieczki.find(wycieczka => wycieczka.id === id);
  }

  addProduct(wycieczkaADD: WycieczkaData): WycieczkaData[] {
    wycieczkaADD.id = this.wycieczki[this.wycieczki.length - 1].id + 1 ;
    this.wycieczki.push(wycieczkaADD);
    return this.getProducts();
  }

  deleteProduct(wycieczkaDEL: WycieczkaData): WycieczkaData[]{
    this.wycieczki = this.wycieczki.filter(wycieczka => wycieczka.id !== wycieczkaDEL.id);
    return this.getProducts();
  }

  getMaxPrice(){
    return Math.max.apply(Math, this.wycieczki.map(function(o) { return o.price; }))
  }

  getMinPrice(){
    return Math.min.apply(Math, this.wycieczki.map(function(o) { return o.price; }))
  }

  getMinStartDate(){
    var earliestDate = this.wycieczki[0].startDate;
    this.wycieczki.forEach(obj => {
      if(obj.startDate.getTime() < earliestDate.getTime()){
        earliestDate = obj.startDate;
      }
    })
    return earliestDate;
  }
  
  getMaxEndDate(){
    var latestDate = this.wycieczki[0].endDate;
    this.wycieczki.forEach(obj => {
      // console.log(obj.endDate.getTime() + "   >  " + latestDate.getTime() + " : " + (obj.endDate.getTime() > latestDate.getTime()));
      if(obj.endDate.getTime() > latestDate.getTime()){
        latestDate = obj.endDate;
      }
    })
    // console.log(latestDate);
    return latestDate;
  }

  getCountries(){
    return [...new Set(this.wycieczki.map(wycieczka => wycieczka.country))];
  }

  updatePriceMin(value: number){
    this.minPriceFilter = value;
    this.minPriceChange.next(this.minPriceFilter);
  }

  updatePriceMax(value: number){
    this.maxPriceFilter = value;
    this.maxPriceChange.next(this.maxPriceFilter);
  }

  updateDateRange(startDate: Date, endDate: Date){
    this.startDateFilter = startDate;
    this.startDateChange.next(this.startDateFilter);
    this.endDateFilter = endDate;
    this.endDateChange.next(this.endDateFilter);
  }

  updateCountries(countries: String[]){
    this.countriesFilter = countries;
    this.countriesChange.next(this.countriesFilter);
  }

}
