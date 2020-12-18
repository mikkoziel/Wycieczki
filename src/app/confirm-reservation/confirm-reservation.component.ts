import { Component, OnInit } from '@angular/core';
import { KoszykService } from '../services/koszyk.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirm-reservation',
  templateUrl: './confirm-reservation.component.html',
  styleUrls: ['./confirm-reservation.component.css']
})
export class ConfirmReservationComponent implements OnInit {
    items = [];

    constructor( private koszykService: KoszykService,
      private router: Router) {};
  
    ngOnInit(): void {
        this.items = this.koszykService.getItems();
    }

    onSubmit():void {
      this.koszykService.confirmCart();
      this.router.navigateByUrl('/cart');
    }

}
