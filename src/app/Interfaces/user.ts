import { Order } from './order';

export interface Credentials {
    email: string;
    password: string;
}

export interface User{
  uid?: string;
  mail: string;
  admin: boolean;
  cart: Order[];
  orders: Order[];
}