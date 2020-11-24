import { Injectable } from '@angular/core';

import { WycieczkaData } from '../Interfaces/wycieczkaData';
import { Order } from '../Interfaces/order';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KoszykService {
  items: Order[] = [];
  seats_taken: number;
  total_price: number;
  
  seatsChange: Subject<number> = new Subject<number>();
  priceChange: Subject<number> = new Subject<number>();
  
  constructor() {
    this.seats_taken = 0;
    this.total_price = 0;
   }

  addToCart(product: WycieczkaData, startDate:Date, endDate: Date) {
    if(this.findInCart(product, startDate, endDate)){
      this.addMoreSeats(product.id);
    } else{
      this.items.push({
        wycieczka: product,
        quantity: 1,
        startDate: startDate,
        endDate: endDate,
        total_price: product.price
      });
    }
    this.updateStats();
    return this.getItems();
  }

  freeFromCart(product: WycieczkaData){
    this.items.forEach(function(obj, index, object) {
      if(obj.wycieczka.id == product.id){
        obj.quantity--;
        if(obj.quantity == 0){
          object.splice(index, 1);
          console.log(object)
        }
        obj.total_price = obj.quantity * obj.wycieczka.price;
      }
    })
    this.updateStats();
    return this.getItems();
  }

  getItems() {
    return this.items;
  }

  getSeatsTaken(){
    return this.seats_taken;
  }

  getTotalPrice(){
    return this.total_price;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  findInCart(product: WycieczkaData, startDate: Date, endDate:Date){
    return this.getProduct(product.id, startDate, endDate) != undefined;    
  }

  getProduct(id: number, startDate: Date, endDate:Date){
    return this.items.find(orderitem => 
      orderitem.wycieczka.id == id &&
      orderitem.startDate.getTime() == startDate.getTime() &&
      orderitem.endDate.getTime() == endDate.getTime());
  }
  
  getTotalOrderItemPrice(id: number, startDate: Date, endDate:Date){
    var product: Order = this.getProduct(id, startDate, endDate);
    if(product == null){
      return 0;
    }
    return product.total_price;
  }

  getSeatsOfProduct(id: number, startDate: Date, endDate:Date){
    return this.getQuantityOfOrder(this.getProduct(id, startDate, endDate));
  }

  getQuantityOfOrder(order: Order){
    if(order == null){
      return 0;
    }
    return order.quantity;
  }

  addMoreSeats(id: number){
    this.items.forEach(function(obj) {
      if(obj.wycieczka.id == id){
        obj.quantity++;
        obj.total_price = obj.quantity * obj.wycieczka.price;
      }
    })
  }

  updateStats(){
    this.seats_taken = 0;
    this.total_price = 0;
    this.items.forEach(obj => {
        this.seats_taken = this.seats_taken + obj.quantity;
        this.total_price += obj.total_price;
    })
    this.seatsChange.next(this.seats_taken);
    this.priceChange.next(this.total_price);
  }
}
