import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { WycieczkaData } from '../wycieczkaData';
import { KoszykService } from '../koszyk.service';

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
    private koszykService: KoszykService){
  }

  ngOnInit(): void {
  }

  onDeletePress(): void {
    this.deleteWycieczkaEmmiter.emit(this.data);
  }

  reserveSeat(){
    this.data.avaible_seats = this.data.avaible_seats - 1;

    if(this.data.avaible_seats != this.data.seats){
      this.data.minus_show = true;
    }
    if(this.data.avaible_seats == 0){
      this.data.plus_show = false;
    }
    
    this.koszykService.addToCart(this.data);
  }

  freeSeat(){
    this.data.avaible_seats = this.data.avaible_seats + 1;
    if(this.data.avaible_seats == this.data.seats){
      this.data.minus_show = false;
    }      
    if(this.data.avaible_seats != 0){
      this.data.plus_show = true;
    }
  }

  getColor(){
    if(this.data.avaible_seats < 4){
      return "red";
    }
    else{
      return 'green';
    }
  }


}