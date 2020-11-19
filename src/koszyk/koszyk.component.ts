import { Component, OnInit } from '@angular/core';

import { KoszykService } from './koszyk.service';

@Component({
    selector: 'koszyk-root',
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
  
}