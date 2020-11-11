import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WycieczkaData } from '../wycieczkaData';

@Component({
  selector: 'app-wycieczka',
  templateUrl: './wycieczka.component.html',
  styleUrls: ['./wycieczka.component.css']
})
export class WycieczkaComponent implements OnInit {
  @Input() data: WycieczkaData;
  @Output() tripToDeleteEmmiter = new EventEmitter<WycieczkaData>();

  onDeletePress(): void {
    this.tripToDeleteEmmiter.emit(this.data);
  }
  constructor(){
  }

  ngOnInit(): void {
  }

  // reserveSeat(){
  //   this.data.avaible_seats = this.data.avaible_seats - 1;

  //   if(this.data.avaible_seats != this.data.seats){
  //     this.data.minus_show = true;
  //   }
  //   if(this.data.avaible_seats == 0){
  //     this.data.plus_show = false;
  //   }
  //   // alert("You were added to this wycieczka");
  // }

  // freeSeat(){
  //   this.data.avaible_seats = this.data.avaible_seats + 1;
  //   if(this.data.avaible_seats == this.data.seats){
  //     this.data.minus_show = false;
  //   }      
  //   if(this.data.avaible_seats != 0){
  //     this.data.plus_show = true;
  //   }
  //   // alert("you freed a seat");
  // }

}