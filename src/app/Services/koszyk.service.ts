import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { Subject } from 'rxjs';

import { WycieczkaData } from '../interfaces/wycieczkaData';
import { Order } from '../interfaces/order';
import { AuthService } from './auth.service';
import { WycieczkiServiceService } from './wycieczki-service.service';
import { DbService } from './db.service';
import { User } from '../interfaces/user';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type' : 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class KoszykService {
  items: Order[] = [];
  currentUser: User;
  seats_taken: number;
  total_price: number;
  
  seatsChange: Subject<number> = new Subject<number>();
  priceChange: Subject<number> = new Subject<number>();
  
  constructor(private auth: AuthService,
    // private wycieczkiService: WycieczkiServiceService,
    private db: DbService) {
    this.auth.currentUser.subscribe(x=>{
      this.seats_taken = 0;
      this.total_price = 0;
      if(x!=null){
        this.items = x.cart;
        this.currentUser = x;
      } else {
        this.items = [];
        this.currentUser = x;
      }
      this.updateStats()
    })
   }

  addToCart(product: WycieczkaData, startDate:Date, endDate: Date) {
    if(this.findInCart(product, startDate, endDate)){
      this.addMoreSeats(product, startDate, endDate);
    } else{
      this.items.push(<Order>{
        wycieczka: product,
        quantity: 1,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        total_price: product.price
      });
    }
    this.updateStats();
    this.updateCart();
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
    this.updateCart();
    return this.getItems();
  }

  updateCart(){
    this.currentUser.cart = this.items;
    this.db.updateUserObject(this.currentUser.uid, this.currentUser);
  }

  confirmCart(){
    this.currentUser.cart = [];
    this.currentUser.orders = this.currentUser.orders.concat(this.items);
    this.items = [];
    this.db.updateUserObject(this.currentUser.uid, this.currentUser);

    this.updateStats();
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
      (orderitem.wycieczka.id == id &&
      new Date(orderitem.startDate).getTime() == new Date(startDate).getTime() &&
      new Date(orderitem.endDate).getTime() == new Date(endDate).getTime()));
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

  addMoreSeats(product: WycieczkaData, startDate: Date, endDate: Date){
    let updateItem = this.getProduct(product.id, startDate, endDate);
    updateItem.quantity++;
    updateItem.total_price = updateItem.quantity * updateItem.wycieczka.price;
    let index = this.items.indexOf(updateItem);
    this.items[index] = updateItem;
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

  // getIndex(order: Order){
  //   let ret =0;
  //   let ranges = new Array(this.data.cyclic.long).fill(null).map((_, i) => {
  //     return <DateRange>{
  //       id: i,
  //       startDate:add(this.data.startDate, 
  //         { days: i*this.data.cyclic.days, 
  //           weeks: i*this.data.cyclic.weeks, 
  //           months: i*this.data.cyclic.months
  //         }),
  //       endDate: add(this.data.endDate, 
  //         { days: i*this.data.cyclic.days, 
  //           weeks: i*this.data.cyclic.weeks, 
  //           months: i*this.data.cyclic.months
  //         })
  //     }
  //   })
  //   return 0;
  // }
}
