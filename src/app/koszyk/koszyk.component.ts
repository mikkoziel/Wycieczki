import { Component, OnInit } from '@angular/core';

import { KoszykService } from '../koszyk.service';
import { WycieczkaData } from '../wycieczkaData';

@Component({
    selector: 'app-koszyk',
    templateUrl: './koszyk.component.html',
    styleUrls: ['./koszyk.component.css']
  })

export class KoszykComponent implements OnInit{
    title = "Project-koszyk";
    items = [];

    constructor( private koszykService: KoszykService) {};
  
    ngOnInit(): void {
        this.items = this.koszykService.getItems();
    }

    addToKoszyk(wycieczka: WycieczkaData){
        this.items = this.koszykService.addToCart(wycieczka);
    }
  
}