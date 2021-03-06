import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject, PathReference } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { WycieczkaData } from '../interfaces/wycieczkaData';


@Injectable({
  providedIn: 'root'
})
export class DbService {
  private _wycieczkiOb: Observable<WycieczkaData[]>;
  private _wycieczkaOb: Observable<WycieczkaData>;

  public wycieczkaList: AngularFireList<WycieczkaData>;
  public wycieczkaObject: AngularFireObject<WycieczkaData>;

  public maxId: number;

  constructor(private _db: AngularFireDatabase,
    // private storage: AngularFireStorage,
    // private datepipe: DatePipe
    ) {
      
    this.getWycieczkaList('wycieczki');
    this._wycieczkiOb = this.getWycieczkiOb();
    this.getMaxId();

  }

  
  // WYCIECZKI ---------------------------------------------------------------------

  public get wycieczkiOb(){
    return this._wycieczkiOb;
  }

  public set wycieczkiOb(wycieczki: Observable<WycieczkaData[]>){
    this._wycieczkiOb = wycieczki;
  }

  public get wycieczkaOb(){
    return this._wycieczkaOb;
  }

  public set wycieczkaOb(wycieczka: Observable<any>){
    this._wycieczkaOb = wycieczka;
  }

  public get db(){
    return this._db;
  }

  getMaxId(){
    let id = 0;
    this._wycieczkiOb.subscribe(wycieczki =>{
      wycieczki.forEach(x => {
        if(x.id > id){
          id = x.id;
        }
      });
      this.maxId = id;
    })
  }

  public getWycieczkiOb(){
    return this.db.list<WycieczkaData[]>('wycieczki').valueChanges().pipe(
      map(coll => {
        return coll.map((w: any) => {
          return this.convertFireToWycieczkaData(w);
        })
      }),
    );
  }

  public getWycieczkaOb(id: string){
    this.wycieczkaOb = this.db.object<WycieczkaData>('wycieczki/' + id).valueChanges().pipe(
      map((w: any) => {
          return this.convertFireToWycieczkaData(w);
        })
    );
    return this.wycieczkaOb;
  }

  convertFireToWycieczkaData(w: any){
    return <WycieczkaData>{
      id: w.id,    
      name: w.name,
      country: w.country,
      startDate: new Date(w.startDate),
      endDate: new Date(w.endDate),
      price: w.price,
      currency: w.currency,
      // seats?: number;
      description: w.description,
      image_url: w.image_url,
      avaible_seats: w.avaible_seats,
      plus_show: w.plus_show,
      minus_show: w.minus_show,
      rating: w.rating,
      rating_count: w.rating_count,
      gallery: w.gallery,
      comments: w.comments,
      cyclic: w.cyclic,
      seats_taken: w.seats_taken
    };
  }

  // odczyt danych z bazy
  public getWycieczkaList(listPath: PathReference): AngularFireList<any> {
    this.wycieczkaList = this.db.list(listPath);
    return this.wycieczkaList;
  }

  addWycieczka(w: WycieczkaData): void {
    console.log(w)
    this.wycieczkaList.set(w.id.toString(),
      {
        id: w.id,    
        name: w.name,
        country: w.country,
        startDate: w.startDate,
        endDate: w.endDate,
        price: w.price,
        currency: w.currency,
        // seats?: number;
        description: w.description,
        image_url: w.image_url,
        avaible_seats: w.avaible_seats,
        plus_show: w.plus_show,
        minus_show: w.minus_show,
        rating: w.rating,
        rating_count: w.rating_count == undefined ? 0 : w.rating_count,
        gallery: w.gallery == undefined ? null : w.gallery,
        comments: w.comments == undefined ? null : w.comments,
        cyclic: w.cyclic == undefined ? null : w.cyclic,
        seats_taken: w.seats_taken == undefined ? [0] : w.seats_taken
      }
    );
  }

  getWycieczka(id:string){
    this.wycieczkaObject = this.db.object('wycieczki/' + id);
    return this.wycieczkaObject;
  }

  updateWycieczkaId(value: WycieczkaData){
    this.getWycieczka(value.id.toString());
    this.updateWycieczka(value);
  }

  updateWycieczka(value: WycieczkaData): void {
    this.wycieczkaObject.update(this.convertWycieczka(value));
  }

  deleteWycieczka(id: number): void {
    this.wycieczkaObject = this.db.object('/wycieczki/' + id.toString());
    this.wycieczkaObject.remove();
  }

  getImage(path: string){
    return path;
  }

  // USERS ---------------------------------------------------------------------

  getUserObject(uid:string){
    return this.db.object('/users/' + uid).valueChanges();
  }

  getUserObjectObsBool(uid: string){
    return this.db.object<boolean>('/users/' + uid).valueChanges();
  }

  updateUserObject(uid:string, value:User){
    this.db.object('/users/' + uid).update({
      admin: value.admin,
      mail: value.mail,
      cart: this.convertCart(value.cart),
      orders: this.convertCart(value.orders)
    })
  }

  addUser(value:User){
    this.db.object('/users/' + value.uid).set({
      admin: value.admin,
      mail: value.mail
    })
  }

  convertCart(cart){
    let arr = []
    cart.forEach(x=>{
      // console.log(x)
      arr.push({
        quantity: x.quantity,
        startDate: new Date(x.startDate).toDateString(),
        endDate: new Date(x.endDate).toDateString(),
        total_price: x.total_price,
        wycieczka: this.convertWycieczka(x.wycieczka),
      })
    })
    return arr;
  }

  convertWycieczka(value){
    return {
      id: value.id,
      name: value.name,
      country: value.country,
      startDate: new Date(value.startDate).toDateString(),
      endDate: new Date (value.endDate).toDateString(),
      price: value.price,
      currency: value.currency,
      // seats: value.seats,
      description: value.description,
      image_url: value.image_url,
      avaible_seats: value.avaible_seats,
      plus_show: value.plus_show,
      minus_show: value.minus_show,
      rating: value.rating,
      rating_count: value.rating_count == undefined ? 0 : value.rating_count,
      gallery: value.gallery == undefined ? null : value.gallery,
      comments: value.comments == undefined ? null : value.comments,
      cyclic: value.cyclic == undefined ? null : value.cyclic,
      seats_taken: value.seats_taken == undefined ? [0] : value.seats_taken
    }
  }

}

