import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { MockAuthService } from './auth.service.mock';
import { DbService } from './db.service';
import { MockDbService } from './db.service.mock';

import { KoszykService } from './koszyk.service';
import { Wycieczki } from '../mock';
import { Order } from '../interfaces/order';

const order = <Order>{
    wycieczka: Wycieczki[1],
    startDate: Wycieczki[1].startDate,
    endDate: Wycieczki[1].endDate,
    quantity: 1,
    total_price: 0 
  }

const Orders =[order, order, order]

describe('CartService', () => {
  let service: KoszykService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        KoszykService,
        { provide: DbService, useClass: MockDbService },
        { provide: AuthService, useClass: MockAuthService }
      ]
    });
    service = TestBed.inject(KoszykService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('should addToCart not in Cart', () => {
    expect(service).toBeTruthy();
    let wycieczka = Wycieczki[0];
    service.addToCart(wycieczka, wycieczka.startDate, wycieczka.endDate);
  });

  it('should freeFromCart', () => {
    expect(service).toBeTruthy();
    service.items = Orders
    
    let wycieczka = Wycieczki[0];
    service.freeFromCart(wycieczka);
  });
  
  it('should freeFromCart 2', () => {
    expect(service).toBeTruthy();
    service.items = Orders.concat({
              wycieczka: Wycieczki[0],
              startDate: Wycieczki[0].startDate,
              endDate: Wycieczki[0].endDate,
              quantity: 1,
              total_price: 0 
              })
    
    let wycieczka = Wycieczki[0];
    service.freeFromCart(wycieczka);
  });

  it('should freeFromCart 3', () => {
    expect(service).toBeTruthy();
    service.items = Orders.concat( 
              {
              wycieczka: Wycieczki[0],
              startDate: Wycieczki[0].startDate,
              endDate: Wycieczki[0].endDate,
              quantity: 3,
              total_price: 0 
              }
            )
    
    let wycieczka = Wycieczki[0];
    service.freeFromCart(wycieczka);
  });
  
  it('should confirmCart', () => {
    expect(service).toBeTruthy();
    service.items = Orders
    
    service.confirmCart();
  });
});
