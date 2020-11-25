import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, of } from 'rxjs';
import { catchError, map, tap, min } from 'rxjs/operators';

import { Moment } from 'moment';

import { Wycieczki } from '../mock';
import { WycieczkaData } from '../Interfaces/wycieczkaData'
import { MaxPriceProductPipe } from '../Pipes/max-price-product.pipe';


const httpOptions = { headers: new HttpHeaders({ 'Content-Type' : 'application/json' }) };
@Injectable({
  providedIn: 'root'
})
export class WycieczkiServiceService {
  // wycieczki = [...Wycieczki];
  wycieczki: Observable<WycieczkaData[]>;
  // wycieczkiWithSeats: WycieczkaData[];

  private wycieczkiApiUrl = "api/wycieczki";

  minPriceFilter: number;
  maxPriceFilter:number;
  startDateFilter: Date;
  endDateFilter: Date;
  countriesFilter: String[];

  minPriceChange: Subject<number> = new Subject<number>();
  maxPriceChange: Subject<number> = new Subject<number>();
  startDateChange: Subject<Date> = new Subject<Date>();
  endDateChange: Subject<Date> = new Subject<Date>();
  countriesChange: Subject<String[]> = new Subject<String[]>();
  
  constructor(private http:HttpClient) { 
    this.wycieczki = this.getProducts();
    // this.minPriceFilter = this.getMinPrice();
    // this.maxPriceFilter = this.getMaxPrice();
    // this.startDateFilter = this.getMinStartDate();
    // this.endDateFilter = this.getMaxEndDate();
  }

  getProducts(): Observable<WycieczkaData[]>{
    return this.http.get<WycieczkaData[]>(this.wycieczkiApiUrl)
    .pipe(
      tap(_ => console.log('fetched wycieczki')),
      catchError(this.handleError<WycieczkaData[]>('getWycieczki', []))
    );
  }

  getProduct(id: number): Observable<WycieczkaData>{
    const wycieczkaApiUrl = `api/wycieczki/${id}`;
    return this.http.get<WycieczkaData>(wycieczkaApiUrl).pipe(
      map(x => { return this.initSeatsTakenWycieczka(x)}),
      tap(_ => console.log(`fetched wycieczka id=${id}`)),
      catchError(this.handleError<WycieczkaData>(`getProduct id=${id}`))
    );    
  }

  updateProduct(wycieczkaUPD: WycieczkaData): Observable<any>{
    const url = `${this.wycieczkiApiUrl}/${wycieczkaUPD.id}`;
    return this.http.put(url, wycieczkaUPD, httpOptions);
  }

  postProduct(wycieczkaPOST: WycieczkaData): Observable<WycieczkaData>{
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
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  

  // getProducts(): WycieczkaData[]{
  //   return this.wycieczki;
  // }


  // getProduct(id: number): WycieczkaData | undefined{
  //   return this.wycieczki.find(wycieczka => wycieczka.id === id);
  // }

  // addProduct(wycieczkaADD: WycieczkaData): WycieczkaData[] {
  //   wycieczkaADD.id = this.wycieczki[this.wycieczki.length - 1].id + 1 ;
  //   this.wycieczki.push(wycieczkaADD);
  //   return this.getProducts();
  // }

  // deleteProduct(wycieczkaDEL: WycieczkaData): WycieczkaData[]{
  //   this.wycieczki = this.wycieczki.filter(wycieczka => wycieczka.id !== wycieczkaDEL.id);
  //   return this.getProducts();
  // }

  reserveSeat(wycieczkaRES: WycieczkaData, id: number){
    // this.wycieczki.forEach(obj=>{
      // if(obj.id == wycieczkaRES.id){
        wycieczkaRES.seats_taken[id] = wycieczkaRES.seats_taken[id] + 1;

        if(wycieczkaRES.avaible_seats != wycieczkaRES.seats_taken[id]){
          wycieczkaRES.minus_show = true;
        }
        if(wycieczkaRES.seats_taken[id] == 0){
          wycieczkaRES.plus_show = false;
        }
        this.updateProduct(wycieczkaRES);
      // }
    // })
  }

  freeSeat(wycieczkaFREE: WycieczkaData, id:number){
    // this.wycieczki.forEach(obj=>{
      // if(obj.id == wycieczkaFREE.id){
        wycieczkaFREE.seats_taken[id] = wycieczkaFREE.seats_taken[id] - 1;
        if(wycieczkaFREE.avaible_seats == wycieczkaFREE.seats_taken[id]){
          wycieczkaFREE.minus_show = false;
        }      
        if(wycieczkaFREE.seats_taken[id] != 0){
          wycieczkaFREE.plus_show = true;
        }
        this.updateProduct(wycieczkaFREE);
      // }
    // })
  }

  addComment(wycieczkaCOM: WycieczkaData, author:string, comment:string){
    // this.wycieczki.forEach(obj=>{
      // if(obj.id == wycieczkaCOM.id){
        wycieczkaCOM.comments.push({
          author: author,
          comment: comment
        })
        this.updateProduct(wycieczkaCOM);
        // console.log(wycieczkaCOM.comments)
      // }
    // })
  }

  // getAvailableColor(wycieczkaCOL: WycieczkaData){
  //   if(wycieczkaCOL.avaible_seats < 4){
  //     return "red";
  //   }
  //   else{
  //     return 'green';
  //   }

  // }

  // getMaxPrice(){
    // return Math.max.apply(Math, this.wycieczki.map(function(o) { return o.price; }))
  // }

  // getMinPrice(){
  //   this.wycieczki.pipe(
  //     min((a:WycieczkaData, b) => a.price < b.price ? -1:1)
  //     ).subscribe((x: WycieczkaData)=>this.minPriceFilter =x.price);
  
  //   return Math.min.apply(Math, this.wycieczki.map(function(o) { return o.price; }))
  // }

  // getMinStartDate(){
  //   var earliestDate = this.wycieczki[0].startDate;
  //   this.wycieczki.forEach(obj => {
  //     if(obj.startDate.getTime() < earliestDate.getTime()){
  //       earliestDate = obj.startDate;
  //     }
  //   })
  //   return earliestDate;
  // }
  
  // getMaxEndDate(){
  //   var latestDate = this.wycieczki[0].endDate;
  //   this.wycieczki.forEach(obj => {
  //     if(obj.endDate.getTime() > latestDate.getTime()){
  //       latestDate = obj.endDate;
  //     }
  //   })
  //   return latestDate;
  // }

  // getCountries(){
  //   return [...new Set(this.wycieczki.map(wycieczka => wycieczka.country))];
  // }

  updatePriceMin(value: number){
    this.minPriceFilter = value;
    this.minPriceChange.next(this.minPriceFilter);
  }

  updatePriceMax(value: number){
    this.maxPriceFilter = value;
    this.maxPriceChange.next(this.maxPriceFilter);
  }

  // updateDateRange(startDate: Moment, endDate: Moment){
  //   if(startDate == null){
  //     this.startDateFilter = this.getMinStartDate();
  //   }else{
  //     this.startDateFilter = startDate.toDate();
  //   }
  //   console.log(this.startDateFilter)
  //   this.startDateChange.next(this.startDateFilter);
    
  //   if(endDate == null){
  //     this.startDateFilter = this.getMaxEndDate();
  //   } else {
  //     this.endDateFilter = endDate.toDate();
  //   }
  //   this.endDateChange.next(this.endDateFilter);
  // }

  updateCountries(countries: String[]){
    this.countriesFilter = countries;
    this.countriesChange.next(this.countriesFilter);
  }

  initSeatsTaken(){
    this.wycieczki.pipe(map(wyc=> wyc.map(x => {
      x = this.initSeatsTakenWycieczka(x)
    })));
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

  fillArray(value: any, len: number) {
    if (len == 0) return [];
    var a = [value];
    while (a.length * 2 <= len) a = a.concat(a);
    if (a.length < len) a = a.concat(a.slice(0, len - a.length));
    return a;
  }

}
