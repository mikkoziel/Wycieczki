import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WycieczkiServiceService } from '../Services/wycieczki-service.service';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
const moment = _rollupMoment || _moment;

export interface CountryFilter {
  name: string;
  checked: boolean;
  countriesBoxes?: CountryFilter[];
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
  minPrice = 0;
  minValuePrice = 0;
  maxPrice = 0;
  maxValuePrice = 0;

  range = new FormGroup({
    start: new FormControl(moment),
    end: new FormControl(moment)
  });

  countries = [];
  countryFilter: CountryFilter = {
    name: "Countries",
    checked: true
  };

  enabled =true;

  constructor(private wycieczkiService: WycieczkiServiceService) { }

  ngOnInit(): void {
    // this.minPrice = this.wycieczkiService.getMinPrice();
    this.minValuePrice = this.minPrice;
    // this.maxPrice = this.wycieczkiService.getMaxPrice();
    this.maxValuePrice = this.maxPrice;
    // this.range.controls.start.setValue(this.wycieczkiService.getMinStartDate());
    // this.range.controls.end.setValue(this.wycieczkiService.getMaxEndDate());
    // this.countries = this.wycieczkiService.getCountries();
    // this.countryFilter.countriesBoxes = this.wycieczkiService.getCountries().map(country => {
    //   return <CountryFilter> {
    //     name: country,
    //     checked: true
    //   };
    // })
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
    // this.wycieczkiService.updatePriceMin(this.minValuePrice);
    // this.wycieczkiService.updatePriceMax(this.maxValuePrice);
    // // this.wycieczkiService.updateDateRange(this.range.controls.start.value, this.range.controls.end.value);
    // this.wycieczkiService.updateCountries(this.countryFilter.countriesBoxes.reduce(function(filtered, option) {
    //   if(option.checked){
    //     filtered.push(option.name);
    //   }
    //   return filtered;      
    // }, []));
    // console.log("Submit");
  }

  clearFilters(){
    this.minValuePrice = this.minPrice;
    this.maxValuePrice = this.maxPrice;
    // this.range.controls.start.setValue(this.wycieczkiService.getMinStartDate());
    // this.range.controls.end.setValue(this.wycieczkiService.getMaxEndDate());
    this.countryFilter.countriesBoxes.forEach(obj =>
      obj.checked = true
    )
    this.onSubmit();
  }
}
