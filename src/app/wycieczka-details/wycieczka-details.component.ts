import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WycieczkaData } from '../Interfaces/wycieczkaData';
import { KoszykService } from '../Services/koszyk.service';
import { WycieczkiServiceService } from '../Services/wycieczki-service.service';

@Component({
  selector: 'app-wycieczka-details',
  templateUrl: './wycieczka-details.component.html',
  styleUrls: ['./wycieczka-details.component.css']
})
export class WycieczkaDetailsComponent implements OnInit {
  id: number;
  data: WycieczkaData;
  sub;

    constructor(private _Activatedroute:ActivatedRoute,
      private wycieczkiService: WycieczkiServiceService,
      private koszykService: KoszykService) { 
  }

  ngOnInit(): void {     
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
      console.log(params);
      this.id = Number(params.get('id')); 
      this.data = this.wycieczkiService.getProduct(this.id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getColor(){
    this.wycieczkiService.getAvailableColor(this.data);
  }
  
  reserveSeat(){
    this.wycieczkiService.reserveSeat(this.data); 
    this.koszykService.addToCart(this.data);
  }

  freeSeat(){
    this.wycieczkiService.freeSeat(this.data);  
    this.koszykService.freeFromCart(this.data);
  }

}
