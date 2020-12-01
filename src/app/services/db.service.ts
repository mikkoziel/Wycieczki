import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject, PathReference } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
// import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WycieczkaData } from '../interfaces/wycieczkaData';

// declare var firebase: firebase.App;

@Injectable({
  providedIn: 'root'
})
export class DbService {
  public wycieczkiOb: Observable<WycieczkaData[]>;
  public wycieczkaOb: Observable<any>;

  public wycieczkaList: AngularFireList<any[]>;
  public wycieczkaObject: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase,
    private storage: AngularFireStorage) {
      
    this.getWycieczkaList('wycieczki');
    this.wycieczkiOb =this.db.list('wycieczki').valueChanges().pipe(
      map(coll => {//{return <WycieczkaData[]> <unknown>coll;}
        return coll.map((w: any) => {
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
            // rating_count?: number;
            gallery: w.gallery,
            comments: w.comments,
            cyclic: w.cyclic
          };
        })
      })
    );
    console.log(this.wycieczkiOb);
  }

  public getWycieczkaOb(id: string){
    this.wycieczkaOb = this.db.object('wycieczki/' + id).valueChanges().pipe(
      map((w: any) => {
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
            // rating_count?: number;
            gallery: w.gallery,
            comments: w.comments,
            cyclic: w.cyclic
          };
        })
    );
    console.log(this.wycieczkaOb);
    return this.wycieczkaOb;
  }

  // addWycieczkaOb(value: WycieczkaData): void {
  //   this.wycieczkiOb.push(value);
  //   }






  // odczyt danych z bazy
  public getWycieczkaList(listPath: PathReference): AngularFireList<any[]> {
    this.wycieczkaList = this.db.list(listPath);
    return this.wycieczkaList;
  }

  addWycieczka(value: WycieczkaData): void {
    this.wycieczkaList.push([value]);
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
    // this.db.object('/wycieczki/' + value.$key)
    //   .update({});
    this.wycieczkaObject.update({
      id: value.id,
      name: value.name,
      country: value.country,
      startDate: value.startDate,
      endDate: value.endDate,
      price: value.price,
      currency: value.currency,
      seats: value.seats,
      description: value.description,
      image_url: value.image_url,
      avaible_seats: value.avaible_seats,
      plus_show: value.plus_show,
      minus_show: value.minus_show,
      rating: value.rating,
      rating_count: value.rating_count,
      gallery: value.gallery,
      comments: value.comments,
      cyclic: value.cyclic,
      seats_taken: value.seats_taken
    })
  }

  deleteWycieczka(id: number): void {
    this.wycieczkaObject = this.db.object('/wycieczki/' + id.toString());
    this.wycieczkaObject.remove();
  }

  getImage(path: string){//: Observable<string | null>{
    // var ref = this.storage.refFromURL(path);
    // console.log(ref);
    // var x = ref.getDownloadURL();
    // console.log(path + "    " +x);
    // return x;
    return path;
  }

}

