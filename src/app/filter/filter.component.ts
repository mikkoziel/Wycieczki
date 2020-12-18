import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { WycieczkiServiceService } from '../services/wycieczki-service.service';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

import { Router,NavigationEnd, RouterEvent  } from '@angular/router';
import { filter } from 'rxjs/operators';

import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
const moment = _rollupMoment || _moment;

export interface CountryFilter {
  name: string;
  checked: boolean;
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class FilterComponent implements OnInit {
  currentRoute: string;
  routeFlag: boolean = false;

  minPrice = 0;
  minValuePrice = 0;
  maxPrice = 0;
  maxValuePrice = 0;
  
  minPrice_subscription: Subscription;
  maxPrice_subscription: Subscription;
  startDate_subscription: Subscription;
  endDate_subscription: Subscription;
  countries_subscription: Subscription;

  minPriceFilter:boolean = false;
  maxPriceFilter:boolean = false;
  rangeFilter:boolean = false;
  countriesFilter:boolean = false;

  range = new FormGroup({
    start: new FormControl(moment),
    end: new FormControl(moment)
  });

  rangeValue = new FormGroup({
    start: new FormControl(moment),
    end: new FormControl(moment)
  });
  
  countries = [];
  countryValue: CountryFilter[] = [];

  minEmitter = new BehaviorSubject<number>(this.minPrice); 
  maxEmitter = new BehaviorSubject<number>(this.minPrice); 
  rangeEmitter = new BehaviorSubject<FormGroup>(this.rangeValue); 
  countriesEmitter = new BehaviorSubject<CountryFilter[]>(this.countryValue);   

  enabled =true;


  priceOpenState: boolean = false;


  constructor(private wycieczkiService: WycieczkiServiceService,
    private router: Router) {
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)
        ).subscribe((x: RouterEvent) => {
          this.currentRoute = x.url;     
          this.routeFlag = this.currentRoute == "/" || this.currentRoute == "/trip-list" ? true : false;   
          // console.log(this.routeFlag+ "    " +this.currentRoute); 
        });
  }

  ngOnInit(): void {
    this.minPrice_subscription = this.wycieczkiService.minPriceChange.subscribe((value) => {
      this.minPrice = value;
      this.minValuePrice = value; 
      this.minEmitter.next(this.minPrice); 
    });

    this.maxPrice_subscription = this.wycieczkiService.maxPriceChange.subscribe((value) => {
      this.maxPrice = value;
      this.maxValuePrice = value;
      this.maxEmitter.next(this.maxPrice);
    });
    
    this.startDate_subscription = this.wycieczkiService.startDateChange.subscribe((value) => {
      this.range.controls.start.setValue(value);
      this.rangeValue.controls.start.setValue(value);
      this.rangeEmitter.next(this.rangeValue);
    });
    
    this.endDate_subscription = this.wycieczkiService.endDateChange.subscribe((value) => {
      this.range.controls.end.setValue(value);
      this.rangeValue.controls.end.setValue(value);
      this.rangeEmitter.next(this.rangeValue);
    });

    this.countries_subscription = this.wycieczkiService.countriesChange.subscribe((value) => {
      this.countries = value;
      this.countryValue = (value.map(country =>{
        return <CountryFilter> {
          name: country,
          checked: true,
        }
      }))
      this.countriesEmitter.next(this.countryValue);
    });
  }

  ngOnDestroy() {
    this.minPrice_subscription.unsubscribe();
    this.maxPrice_subscription.unsubscribe();
    this.startDate_subscription.unsubscribe();
    this.endDate_subscription.unsubscribe();
    this.countries_subscription.unsubscribe();
  }

  getMinPriceFilter(event: any) {
    if(event.value >= this.maxValuePrice){
      this.maxValuePrice = event.value;
    } 
    this.minValuePrice = event.value;
  }

  getMaxPriceFilter(event: any) {
    if(event.value <= this.minValuePrice){
      this.minValuePrice = event.value;
    } 
    this.maxValuePrice = event.value;
  }

  onSubmit(){
    this.wycieczkiService.updateMinPriceFilter(this.minValuePrice);
    this.wycieczkiService.updateMaxPriceFilter(this.maxValuePrice);
    this.wycieczkiService.updateDateRange(this.rangeValue.controls.start.value, this.rangeValue.controls.end.value);
    this.wycieczkiService.updateCountriesFilter(this.countryValue.reduce(function(filtered, option) {
      if(option.checked){
        filtered.push(option.name);
      }
      return filtered;      
    }, []));
    this.checkFilters();
  }

  clearFilters(){
    this.minValuePrice = this.minPrice;
    this.maxValuePrice = this.maxPrice;
    this.rangeValue.controls.start.setValue(this.range.controls.start.value);
    this.rangeValue.controls.end.setValue(this.range.controls.end.value);
    this.countryValue.forEach(obj =>
      obj.checked = true
    )
    this.onSubmit();
    this.checkFilters();
  }

  checkFilters(){
    this.minPriceFilter = this.minValuePrice != this.minPrice ? true :  false;
    this.maxPriceFilter = this.maxValuePrice != this.maxPrice ? true :  false;
    
    let rangeStartValue: Moment= this.range.controls.start.value;
    let rangeValueStartValue: Moment= this.rangeValue.controls.start.value;
    let rangeEndtValue: Moment= this.range.controls.end.value;
    let rangeValueEndValue: Moment= this.rangeValue.controls.end.value;
    this.rangeFilter = 
      moment(rangeStartValue).diff(moment(rangeValueStartValue)) != 0  &&
      moment(rangeEndtValue).diff(moment(rangeValueEndValue)) != 0 ?
            true : false;

    let country_flag = false;
    this.countryValue.forEach(obj =>{
      if(!obj.checked){
        country_flag = true;
      }}
    )
    this.countriesFilter = country_flag;
  }
  
}
