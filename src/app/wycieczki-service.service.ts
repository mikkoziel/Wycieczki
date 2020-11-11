import { Injectable } from '@angular/core';
import { Wycieczki } from './mock';
import { WycieczkaData } from './wycieczkaData'

@Injectable({
  providedIn: 'root'
})
export class WycieczkiServiceService {
  wycieczki = [...Wycieczki];

  constructor() { }

  getWycieczki(): WycieczkaData[]{
    return Wycieczki;
  }

  getWycieczka(id: number): WycieczkaData | undefined{
    return Wycieczki.find(wycieczka => wycieczka.id === id);
  }

  deleteWycieczka(wycieczkaDEL): WycieczkaData[]{
    return Wycieczki.filter(wycieczka => wycieczka.id !== wycieczkaDEL.id);
  }

  addWycieczka(wycieczkaADD: WycieczkaData): void {
    Wycieczki.push(wycieczkaADD);
  }
}
