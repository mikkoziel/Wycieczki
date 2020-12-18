import { Component, OnInit } from '@angular/core';
import { WycieczkaData } from './interfaces/wycieczkaData';
import { WycieczkiServiceService } from "./services/wycieczki-service.service";
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './wycieczki.component.html',
  styleUrls: ['./wycieczki.component.css']
})

export class WycieczkiComponent implements OnInit{
  title = 'Projekt';
  isMenuCollapsed = true;
  isAdmin: boolean;
  
  constructor(private wycieczkiService: WycieczkiServiceService,
    private auth:AuthService) {
    
  };

  ngOnInit(): void {
    this.getWycieczkiDB();
    this.auth.isAdmin.subscribe(x=> this.isAdmin = x);
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