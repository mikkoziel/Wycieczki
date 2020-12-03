import { Order } from './order';

export interface Credentials {
    email: string;
    password: string;
}

export interface User{
  uid: string;
  cart: Order[];
  orders: Order[];
}