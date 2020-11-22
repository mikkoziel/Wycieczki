import { Injectable } from '@angular/core';

import { WycieczkaData } from './wycieczkaData';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class KoszykService {
  items: Order[] = [];

  addToCart(product: WycieczkaData) {
    if(this.findInCart(product)){
      this.addMoreSeats(product.id);
    } else{
      this.items.push({
        wycieczka: product,
        quantity: 1,
        total_price: product.price
      });
    }
    return this.getItems();
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  findInCart(product: WycieczkaData){
    return this.getProduct(product.id) != undefined;    
  }

  getProduct(id: number){
    return this.items.find(orderitem => orderitem.wycieczka.id == id);
  }

  addMoreSeats(id: number){
    this.items.forEach(function(obj) {
      if(obj.wycieczka.id == id){
        obj.quantity++;
        obj.total_price = obj.quantity * obj.wycieczka.price;
      }
    })
  }

  constructor() { }
}
