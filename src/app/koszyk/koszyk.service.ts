import { Injectable } from '@angular/core';

import {WycieczkaData } from '../wycieczkaData';

@Injectable({
  providedIn: 'root'
})
export class KoszykService {
  items = [];

  addToCart(product: WycieczkaData) {
    this.items.push(product);
    return this.getItems();
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  constructor() { }
}
