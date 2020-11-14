import { Injectable } from '@angular/core';
import { Wycieczki } from './mock';
import { WycieczkaData } from './wycieczkaData'

@Injectable({
  providedIn: 'root'
})
export class WycieczkiServiceService {
  wycieczki = [...Wycieczki];

  constructor() { }

  getProducts(): WycieczkaData[]{
    return this.wycieczki;
  }

  getProduct(id: number): WycieczkaData | undefined{
    return this.wycieczki.find(wycieczka => wycieczka.id === id);
  }

  addProduct(wycieczkaADD: WycieczkaData): void {
    this.wycieczki.push(wycieczkaADD);
  }

  deleteProduct(wycieczkaDEL): WycieczkaData[]{
    return this.wycieczki.filter(wycieczka => wycieczka.id !== wycieczkaDEL.id);
  }

}
