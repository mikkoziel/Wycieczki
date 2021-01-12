import { TestBed } from '@angular/core/testing';
import { DbService } from './db.service';
import { MockDbService } from './db.service.mock';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Wycieczki } from "../mock";

import { WycieczkiServiceService } from './wycieczki-service.service';

describe('WycieczkiServiceService', () => {
  let service: WycieczkiServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
      ],
      providers:[
        WycieczkiServiceService,
        { provide: DbService, useClass: MockDbService }
      ]
    });
    service = TestBed.inject(WycieczkiServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('function getProducts() should return an Observable<User[]>', () => {
    const dummyProducts = [
        Wycieczki[1],
        Wycieczki[2]
    ];

    service.getProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(dummyProducts);
    });

    const req = httpMock.expectOne(`${service.wycieczkiApiUrl}`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyProducts);
  });
  
  it('#getWycieczkiObDB should return an Observable',
  (done: DoneFn) => {
    service.getWycieczkiObDB().subscribe(value=>{
      expect(value).toEqual(jasmine.arrayContaining(Wycieczki));
      done();
    })
  });
  
  it('#getWycieczkaObDB should return an Observable',
  (done: DoneFn) => {
    service.getWycieczkaObDB().subscribe(value=>{
      expect(value).toEqual(jasmine.objectContaining(Wycieczki[1]));
      done();
    })
  });

  it('#getDBWycieczkiOb should return an array',
  () => {
    let retVal = service.getDBWycieczkiOb()
    expect(retVal).toEqual(jasmine.arrayContaining(Wycieczki)); 
  });
  
  it('#getDBWycieczkaOb should return an object',
  () => {
    let retVal = service.getDBWycieczkaOb('1')
    expect(retVal).toEqual(jasmine.objectContaining(Wycieczki[1])); 
  });

  it('#reserveSeat no change in minus and plus',
  () => {
    let wycieczka = Wycieczki[0]
    let id = 1

    wycieczka.seats_taken= []
    wycieczka.seats_taken[id] = 0;
    wycieczka.avaible_seats = 1;
    wycieczka.minus_show = false;
    wycieczka.plus_show = true;

    service.reserveSeat(wycieczka, id);
  });

  
  it('#reserveSeat change in minus and plus',
  () => {
    let wycieczka = Wycieczki[0]
    console.log(wycieczka)
    let id = 1

    wycieczka.seats_taken= []
    wycieczka.seats_taken[id] = -1;
    wycieczka.avaible_seats = 10;
    wycieczka.minus_show = false;
    wycieczka.plus_show = true;

    service.reserveSeat(wycieczka, id);
  });

  
  it('should getMaxPriceObject',() => {
    let wycieczki = Wycieczki

    let retVal = service.getMaxPriceObject(wycieczki);
    expect(retVal).toEqual(2200);
  });

  it('should getMinPriceObject',() => {
    let wycieczki = Wycieczki

    let retVal = service.getMinPriceObject(wycieczki);
    expect(retVal).toEqual(150);
  });

  
  it('should getMinStartDateObject of Date',() => {
    let wycieczki = Wycieczki
    wycieczki[0].startDate = new Date('2000-01-01');
    wycieczki[2].startDate = new Date('1999-01-01');

    let retVal = service.getMinStartDateObject(wycieczki);
    expect(retVal).toEqual(jasmine.objectContaining(new Date()));
  });

  
  it('should getMinStartDateObject of not Date',() => {
    let wycieczki = Wycieczki
    wycieczki[0].startDate = '2000-01-01';

    let retVal = service.getMinStartDateObject(wycieczki);
    expect(retVal).toEqual(jasmine.objectContaining(new Date()));
  });

  
  it('should getMaxEndDateObject of Date',() => {
    let wycieczki = Wycieczki
    wycieczki[0].endDate = new Date('20000-01-01');
    wycieczki[2].endDate = new Date('199988-01-01');

    let retVal = service.getMaxEndDateObject(wycieczki);
    expect(retVal).toEqual(jasmine.objectContaining(new Date()));
  });

  
  it('should getMaxEndDateObject of not Date',() => {
    let wycieczki = Wycieczki
    wycieczki[0].endDate = '20000-01-01';

    let retVal = service.getMaxEndDateObject(wycieczki);
    expect(retVal).toEqual(jasmine.objectContaining(new Date()));
  });
});
