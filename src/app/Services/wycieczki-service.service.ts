import { Injectable } from '@angular/core';
import { Wycieczki } from '../mock';
import { WycieczkaData } from '../Interfaces/wycieczkaData'
import { Subject } from 'rxjs';
import { Moment } from 'moment';

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
    this.startDateFilter = this.getMinStartDate();
    this.endDateFilter = this.getMaxEndDate();
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

  reserveSeat(wycieczkaRES: WycieczkaData, id: number){
    this.wycieczki.forEach(obj=>{
      if(obj.id == wycieczkaRES.id){
        obj.seats_taken[id] = obj.seats_taken[id] - 1;

        if(obj.avaible_seats != obj.seats_taken[id]){
          obj.minus_show = true;
        }
        if(obj.seats_taken[id] == 0){
          obj.plus_show = false;
        }
      }
    })
  }

  freeSeat(wycieczkaFREE: WycieczkaData, id:number){
    this.wycieczki.forEach(obj=>{
      if(obj.id == wycieczkaFREE.id){
        obj.seats_taken[id] = obj.seats_taken[id] + 1;
        if(obj.avaible_seats == obj.seats_taken[id]){
          obj.minus_show = false;
        }      
        if(obj.seats_taken[id] != 0){
          obj.plus_show = true;
        }
      }
    })
  }

  addComment(wycieczkaCOM: WycieczkaData, author:string, comment:string){
    this.wycieczki.forEach(obj=>{
      if(obj.id == wycieczkaCOM.id){
        obj.comments.push({
          author: author,
          comment: comment
        })
        console.log(obj.comments)
      }
    })
  }

  // getAvailableColor(wycieczkaCOL: WycieczkaData){
  //   if(wycieczkaCOL.avaible_seats < 4){
  //     return "red";
  //   }
  //   else{
  //     return 'green';
  //   }

  // }

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
      if(obj.endDate.getTime() > latestDate.getTime()){
        latestDate = obj.endDate;
      }
    })
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

  updateDateRange(startDate: Moment, endDate: Moment){
    if(startDate == null){
      this.startDateFilter = this.getMinStartDate();
    }else{
      this.startDateFilter = startDate.toDate();
    }
    console.log(this.startDateFilter)
    this.startDateChange.next(this.startDateFilter);
    
    if(endDate == null){
      this.startDateFilter = this.getMaxEndDate();
    } else {
      this.endDateFilter = endDate.toDate();
    }
    this.endDateChange.next(this.endDateFilter);
  }

  updateCountries(countries: String[]){
    this.countriesFilter = countries;
    this.countriesChange.next(this.countriesFilter);
  }

  initSeatsTaken(){
    this.wycieczki.forEach(x=>{
      var long: number;
      if(x.cyclic){
        long = x.cyclic.long;
      } else {
        long = 1;
      }
      x.seats_taken = this.fillArray(0, long);
    });
  }

  fillArray(value: any, len: number) {
    if (len == 0) return [];
    var a = [value];
    while (a.length * 2 <= len) a = a.concat(a);
    if (a.length < len) a = a.concat(a.slice(0, len - a.length));
    return a;
  }

}
