import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, of } from 'rxjs';
import { catchError, map, tap, min } from 'rxjs/operators';

import { Moment } from 'moment';

import { Wycieczki } from '../mock';
import { WycieczkaData } from '../interfaces/wycieczkaData'
import { MaxPriceProductPipe } from '../pipes/max-price-product.pipe';
import { DbService } from './db.service';


const httpOptions = { headers: new HttpHeaders({ 'Content-Type' : 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class WycieczkiServiceService {
  private wycieczkiApiUrl = "api/wycieczki";

  minPrice: number;
  maxPrice:number;
  startDate: Date;
  endDate: Date;
  countries: String[];

  minPriceChange: Subject<number> = new Subject<number>();
  maxPriceChange: Subject<number> = new Subject<number>();
  startDateChange: Subject<Date> = new Subject<Date>();
  endDateChange: Subject<Date> = new Subject<Date>();
  countriesChange: Subject<String[]> = new Subject<String[]>();

  minPriceFilter: number;
  maxPriceFilter:number;
  startDateFilter: Date;
  endDateFilter: Date;
  countriesFilter: String[];

  minPriceFilterChange: Subject<number> = new Subject<number>();
  maxPriceFilterChange: Subject<number> = new Subject<number>();
  startDateFilterChange: Subject<Date> = new Subject<Date>();
  endDateFilterChange: Subject<Date> = new Subject<Date>();
  countriesFilterChange: Subject<String[]> = new Subject<String[]>();
  
  constructor(private http:HttpClient,
    private dbService: DbService) { 
  }

  // From firebase ------------------------------------------------
  getWycieczkiObDB(): Observable<WycieczkaData[]>{
    return this.dbService.wycieczkiOb;
  }

  getWycieczkaObDB(): Observable<WycieczkaData>{
    return this.dbService.wycieczkaOb;
  }

  getDBWycieczkiOb(){
    return this.dbService.getWycieczkiOb();
  }

  getDBWycieczkaOb(id: string){
    return this.dbService.getWycieczkaOb(id);
  }

  getImageFromDB(path: string){
    return this.dbService.getImage(path);
  }

  addWycieczka(wycieczka: WycieczkaData){
    this.dbService.addWycieczka(wycieczka);
  }

  // From in-memory-web-api ------------------------------------------------

  getProducts(): Observable<WycieczkaData[]>{
    return this.http.get<WycieczkaData[]>(this.wycieczkiApiUrl)
    .pipe(
      tap(_ => {console.log('fetched wycieczki');}),
      map(x => { return this.convertDatesForArray(x) }),
      catchError(this.handleError<WycieczkaData[]>('getWycieczki', []))
    );
  }

  getProduct(id: number): Observable<WycieczkaData>{
    const wycieczkaApiUrl = `api/wycieczki/${id}`;
    return this.http.get<WycieczkaData>(wycieczkaApiUrl).pipe(
      map(x => { return this.initSeatsTakenWycieczka(x)}),
      map(x => { return this.convertDates(x) }),
      tap(_ => console.log(`fetched wycieczka id=${id}`)),
      catchError(this.handleError<WycieczkaData>(`getProduct id=${id}`))
    );    
  }

  updateProduct(wycieczkaUPD: WycieczkaData): Observable<any>{
    const url = `${this.wycieczkiApiUrl}/${wycieczkaUPD.id}`;
    return this.http.put(url, wycieczkaUPD, httpOptions);
  }

  addProduct(wycieczkaPOST: WycieczkaData): Observable<WycieczkaData>{
    return this.http.post<WycieczkaData>(this.wycieczkiApiUrl, wycieczkaPOST);
  }

  removeProduct(product: WycieczkaData | number): Observable<WycieczkaData>{
    const id = typeof product === 'number' ? product:product.id;
    const url = `${this.wycieczkiApiUrl}/${id}`;

    return this.http.delete<WycieczkaData>(url, httpOptions).pipe(

      tap(_=> console.log(`deleted Wycieczka id=${id}`)),
      catchError(this.handleError<WycieczkaData>('deleteProduct'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  
  // functionality ------------------------------------------------
  reserveSeat(wycieczkaRES: WycieczkaData, id: number){    
    wycieczkaRES.seats_taken[id] += 1;

    if(wycieczkaRES.avaible_seats != wycieczkaRES.seats_taken[id]){
      wycieczkaRES.minus_show = true;
    }
    if(wycieczkaRES.seats_taken[id] == 0){
      wycieczkaRES.plus_show = false;
    }
    this.updateProduct(wycieczkaRES);
  }

  freeSeat(wycieczkaFREE: WycieczkaData, id:number){
    wycieczkaFREE.seats_taken[id] -= 1;
    if(wycieczkaFREE.avaible_seats == wycieczkaFREE.seats_taken[id]){
      wycieczkaFREE.minus_show = false;
    }      
    if(wycieczkaFREE.seats_taken[id] != 0){
      wycieczkaFREE.plus_show = true;
    }
    this.updateProduct(wycieczkaFREE);
  }

  addComment(wycieczkaCOM: WycieczkaData, author:string, comment:string){
    if(!wycieczkaCOM.comments){
      wycieczkaCOM.comments = [];
    }
    wycieczkaCOM.comments.push({
      author: author,
      comment: comment
    })
    this.updateProduct(wycieczkaCOM);
  }

  // Statistics ------------------------------------------------
  getMaxPriceObject(wycieczki: WycieczkaData[]){
    var maxPrice = 0;
    wycieczki.forEach(x=>{
      if(x.price > maxPrice){
        maxPrice = x.price;
      }
    })
    this.updateMaxPrice(maxPrice);
    this.updateMaxPriceFilter(maxPrice);
    return maxPrice;
  }

  getMinPriceObject(wycieczki: WycieczkaData[]){    
    var minPrice = wycieczki[0].price;
    wycieczki.forEach(x=>{
      if(x.price < minPrice){
        minPrice = x.price;
      }
    })
    this.updateMinPrice(minPrice);
    this.updateMinPriceFilter(minPrice);
    return minPrice;
  }

  getMinStartDateObject(wycieczki: WycieczkaData[]){
    var earliestDate: Date;
    if(wycieczki[0].startDate instanceof Date){
      earliestDate = wycieczki[0].startDate;
    } else{
      earliestDate = new Date(wycieczki[0].startDate);
    }
    wycieczki.forEach(x=>{
      var start = x.startDate;
      if(!(start instanceof Date)){
        start = new Date(start);
      }
      if(start.getTime() < earliestDate.getTime()){
        earliestDate = x.startDate;
      }
    });
    this.updateStartDate(earliestDate);
    this.updateStartDateFilter(earliestDate);
    return earliestDate;
  }
  
  getMaxEndDateObject(wycieczki: WycieczkaData[]){
    var latestDate: Date;
    if(wycieczki[0].startDate instanceof Date){
      latestDate = wycieczki[0].endDate;
    }else{
      latestDate = new Date(wycieczki[0].endDate);
    }
    wycieczki.forEach(x=>{
      var end = x.endDate;
      if(!(end instanceof Date)){
        end = new Date(end);
      }
      if(end.getTime() > latestDate.getTime()){
        latestDate = x.endDate;
      }
    })
    this.updateEndDate(latestDate);
    this.updateEndDateFilter(latestDate);
    return latestDate;
  }
  
  getAllSeats(){
    var allSeats = 0;
    this.getProducts()
      .subscribe(wycieczki =>{
        wycieczki.forEach(x=>{
          if(x.cyclic){
            allSeats += x.cyclic.long*x.avaible_seats;
          } else{
            allSeats += x.avaible_seats;
          }
        })
      });
    return allSeats;
  }

  getAllSeatsTaken(){
    var allSeatsTaken = 0;
    this.getProducts()
        .subscribe(wycieczki =>{
          wycieczki.forEach(x=>{
            x.seats_taken.forEach(a=> allSeatsTaken += a)
          })
        });
    return allSeatsTaken;
  }

  getAllAvailableSeats(){
    return this.getAllSeats() - this.getAllSeatsTaken();
  }
  
  getCountriesObject(wycieczki: WycieczkaData[]){
    var country_arr = [];
    wycieczki.forEach(x=>{
      country_arr.push(x.country)
    })
    var countrySet = [...new Set(country_arr)];
    this.updateCountries(countrySet);
    this.updateCountriesFilter(countrySet);
    return countrySet;
  }

  updateDateRange(startDate: Moment, endDate: Moment){
    if(startDate == null){
      this.updateStartDateFilter(this.startDate);
    }else{
      this.updateStartDateFilter(startDate.toDate());
    }
    
    if(endDate == null){
      this.updateEndDateFilter(this.endDate);
    } else {
      this.updateEndDateFilter(endDate.toDate());
    }
  }

  initSeatsTakenWycieczka(x:WycieczkaData): WycieczkaData{
    var long: number;
    if(x.cyclic){
      long = x.cyclic.long;
    } else {
      long = 1;
    }
    x.seats_taken = this.fillArray(0, long);
    return x;
  }

  convertDatesForArray(x: WycieczkaData[]): WycieczkaData[]{
    x.forEach(wycieczka => {
      wycieczka = this.convertDates(wycieczka);
    });
    return x;
  }

  
  convertDates(x:WycieczkaData): WycieczkaData{
    if(!(x.startDate instanceof Date )){
      x.startDate = new Date(x.startDate);
    }
    if(!(x.endDate instanceof Date )){
      x.endDate = new Date(x.endDate);
    }
    return x;
  }

  fillArray(value: any, len: number) {
    if (len == 0) return [];
    var a = [value];
    while (a.length * 2 <= len) a = a.concat(a);
    if (a.length < len) a = a.concat(a.slice(0, len - a.length));
    return a;
  }
  
  // Update statistics ------------------------------------------------
  updateMaxPrice(maxPrice: number){
    this.maxPrice = maxPrice;
    this.maxPriceChange.next(maxPrice);
  }

  updateMaxPriceFilter(maxPrice: number){
    this.maxPriceFilter = maxPrice;
    this.maxPriceFilterChange.next(maxPrice);
  }

  updateMinPrice(minPrice: number){
    this.minPrice = minPrice;
    this.minPriceChange.next(minPrice);
  }

  updateMinPriceFilter(minPrice: number){
    this.minPriceFilter = minPrice;
    this.minPriceFilterChange.next(minPrice);
  }

  updateStartDate(startDate: Date){
    this.startDate = startDate;
    this.startDateChange.next(startDate);
  }
  
  updateStartDateFilter(startDate: Date){
    this.startDateFilter = startDate;
    this.startDateFilterChange.next(startDate);
  }

  updateEndDate(endDate: Date){
    this.endDate = endDate;
    this.endDateChange.next(endDate);
  }

  updateEndDateFilter(endDate: Date){
    this.endDateFilter = endDate;
    this.endDateFilterChange.next(endDate);
  }

  updateCountries(countries: String[]){
    this.countries = countries;
    this.countriesChange.next(countries);
  }
  
  updateCountriesFilter(countries: String[]){
    this.countriesFilter = countries;
    this.countriesFilterChange.next(countries);
  }

}
