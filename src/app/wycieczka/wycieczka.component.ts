import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { WycieczkaData } from '../Interfaces/wycieczkaData';
import { KoszykService } from '../Services/koszyk.service';
import { WycieczkiServiceService } from '../Services/wycieczki-service.service';

@Component({
  selector: 'app-wycieczka',
  templateUrl: './wycieczka.component.html',
  styleUrls: ['./wycieczka.component.css']
})

export class WycieczkaComponent implements OnInit {
  @Input() data: WycieczkaData;
  @Output() deleteWycieczkaEmmiter = new EventEmitter<WycieczkaData>();

  constructor(
    private route: ActivatedRoute,
    private wycieczkiService: WycieczkiServiceService,
    private koszykService: KoszykService){
  }

  ngOnInit(): void {
  }

  onDeletePress(): void {
    this.deleteWycieczkaEmmiter.emit(this.data);
  }

  // reserveSeat(){
  //   this.wycieczkiService.reserveSeat(this.data);    
  //   this.koszykService.addToCart(this.data, this.data.startDate, this.data.endDate);
  // }

  // freeSeat(){
  //   this.wycieczkiService.freeSeat(this.data);  
  //   this.koszykService.freeFromCart(this.data);
  // }

  // getColor(){
  //   this.wycieczkiService.getAvailableColor(this.data);
  // }


}