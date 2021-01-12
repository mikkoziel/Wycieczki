import { AngularFireList, AngularFireObject } from "@angular/fire/database";
import { Observable, of } from "rxjs";
import { User } from "../interfaces/user";
import { WycieczkaData } from "../interfaces/wycieczkaData";
import { Wycieczki } from "../mock";

const uid = 'D5zHOxFtQ8fXfnIeqBQZlTKw34y2'

const user = <User>{
    admin: true,
    mail: "aaaa",
    cart: [],
    orders: [],
    uid: uid
}

export class MockDbService {
    public wycieczkiOb: Observable<WycieczkaData[]> = of(Wycieczki);
    public wycieczkaOb: Observable<WycieczkaData> = of(Wycieczki[1]);

    public wycieczkaList: WycieczkaData = Wycieczki[1];
    public wycieczkaObject: WycieczkaData[] = Wycieczki;
    
    getWycieczkiOb(){
        return Wycieczki;
    }

    getWycieczkaOb(id){
        return Wycieczki[1];
    }

    updateWycieczkaId(wycieczka){

    }

    getUserObject(uid){
        return of(user);
    }

    getUserObjectObsBool(uid){
        return of(user)
    }

    updateUserObject(){}


}