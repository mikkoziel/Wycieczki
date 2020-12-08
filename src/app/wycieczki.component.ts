import { Component, OnInit } from '@angular/core';
import { WycieczkaComponent } from './wycieczka/wycieczka.component';
import { ListaWycieczekComponent } from './lista-wycieczek/lista-wycieczek.component';
import { KoszykComponent } from './koszyk/koszyk.component';
import { WycieczkaData } from './interfaces/wycieczkaData';
import { WycieczkiServiceService } from "./services/wycieczki-service.service";
import { DbService } from './services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: './wycieczki.component.html',
  styleUrls: ['./wycieczki.component.css']
})

export class WycieczkiComponent implements OnInit{
  title = 'Projekt';
  
  constructor(private wycieczkiService: WycieczkiServiceService) {
    
  };

  ngOnInit(): void {
    this.getWycieczkiDB();
  }

  
  getWycieczkiDB():void{
    this.wycieczkiService.getWycieczkiObDB()
            .subscribe(wycieczki => {
              this.initSubscriptions(wycieczki);});
  }

  initSubscriptions(wycieczki: WycieczkaData[]){
    this.wycieczkiService.getMinPriceObject(wycieczki);
    this.wycieczkiService.getMaxPriceObject(wycieczki);
    this.wycieczkiService.getMinStartDateObject(wycieczki);
    this.wycieczkiService.getMaxEndDateObject(wycieczki);
    this.wycieczkiService.getCountriesObject(wycieczki);
  }
  
}