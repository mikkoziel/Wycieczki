import { WycieczkaData } from "../interfaces/wycieczkaData";
import { add } from 'date-fns';
import { of, Subject } from "rxjs";
import { Wycieczki } from "../mock";

export class MockWycieczkiServiceService {
    wycieczkaMock = Wycieczki[1]

    minPriceChange: Subject<number> = new Subject<number>();
    maxPriceChange: Subject<number> = new Subject<number>();
    startDateChange: Subject<Date> = new Subject<Date>();
    endDateChange: Subject<Date> = new Subject<Date>();
    countriesChange: Subject<String[]> = new Subject<String[]>();

    minPriceFilterChange: Subject<number> = new Subject<number>();
    maxPriceFilterChange: Subject<number> = new Subject<number>();
    startDateFilterChange: Subject<Date> = new Subject<Date>();
    endDateFilterChange: Subject<Date> = new Subject<Date>();
    countriesFilterChange: Subject<String[]> = new Subject<String[]>();
  
    getWycieczkiObDB(){
        return of(Wycieczki);
    }

    getDBWycieczkaOb(id: number){
        return of(Wycieczki[id]);
    }

    getImageFromDB(path){
        return null;
    }

    getMinPriceObject(wycieczki){
        return 0;
    }

    getMaxPriceObject(wycieczki){
        return 1000;
    }

    getMinStartDateObject(wycieczki){
        return new Date();
    }

    getMaxEndDateObject(wycieczki){
        return new Date();
    }

    getCountriesObject(wycieczki){
        return [...new Set([])];
    }

    reserveSeat(){}
    freeSeat(){}
    updateWycieczkaDB(){}
}