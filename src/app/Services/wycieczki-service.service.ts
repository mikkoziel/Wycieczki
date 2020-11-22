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

  minPriceChange: Subject<number> = new Subject<number>();
  maxPriceChange: Subject<number> = new Subject<number>();
  
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

  getCountries(){
    return this.wycieczki.map(wycieczka => wycieczka.country);
  }

  updatePriceMin(value: number){
    this.minPriceFilter = value;
    this.minPriceChange.next(this.minPriceFilter);
  }

  updatePriceMax(value: number){
    this.maxPriceFilter = value;
    this.maxPriceChange.next(this.maxPriceFilter);
  }

}
