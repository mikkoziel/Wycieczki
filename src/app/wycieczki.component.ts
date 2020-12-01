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
  
  constructor(private WycieczkiService: WycieczkiServiceService,
    private dbService: DbService) {
    
  };

  ngOnInit(): void {
    this.getWycieczkiDB();
  }

  
  getWycieczkiDB():void{
    this.dbService.wycieczkiOb
            .subscribe(wycieczki => {
              this.initSubscriptions(wycieczki);});
  }

  initSubscriptions(wycieczki: WycieczkaData[]){
    this.WycieczkiService.getMinPriceObject(wycieczki);
    this.WycieczkiService.getMaxPriceObject(wycieczki);
    this.WycieczkiService.getMinStartDateObject(wycieczki);
    this.WycieczkiService.getMaxEndDateObject(wycieczki);
    this.WycieczkiService.getCountriesObject(wycieczki);
  }
  
}