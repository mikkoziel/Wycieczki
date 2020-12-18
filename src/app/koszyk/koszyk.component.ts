import { Component, OnInit } from '@angular/core';

import { KoszykService } from '../services/koszyk.service';
import { WycieczkaData } from '../interfaces/wycieczkaData';

@Component({
    selector: 'app-koszyk',
    templateUrl: './koszyk.component.html',
    styleUrls: ['./koszyk.component.css']
  })

export class KoszykComponent implements OnInit{
    items = [];

    constructor( private koszykService: KoszykService) {};
  
    ngOnInit(): void {
        this.items = this.koszykService.getItems();
    }
  
}