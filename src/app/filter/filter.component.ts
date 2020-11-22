import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { WycieczkiServiceService } from '../Services/wycieczki-service.service';

export interface CountryFilter {
  name: string;
  checked: boolean;
  countriesBoxes?: CountryFilter[];
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  minPrice = 0;
  minValuePrice = 0;
  maxPrice = 0;
  maxValuePrice = 0;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  countries = [];
  countryFilter: CountryFilter = {
    name: "Countries",
    checked: true
  };

  enabled =true;

  constructor(private wycieczkiService: WycieczkiServiceService) { }

  ngOnInit(): void {
    this.minPrice = this.wycieczkiService.getMinPrice();
    this.minValuePrice = this.minPrice;
    this.maxPrice = this.wycieczkiService.getMaxPrice();
    this.maxValuePrice = this.maxPrice;
    this.range.controls.start.setValue(this.wycieczkiService.getMinStartDate());
    this.range.controls.end.setValue(this.wycieczkiService.getMaxEndDate());
    this.countries = this.wycieczkiService.getCountries();
    this.countryFilter.countriesBoxes = this.wycieczkiService.getCountries().map(country => {
      return <CountryFilter> {
        name: country,
        checked: false
      };
    })
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

  onCountryFilterChange(){

  }

  onSubmit(){
    this.wycieczkiService.updatePriceMin(this.minValuePrice);
    this.wycieczkiService.updatePriceMax(this.maxValuePrice);
    this.wycieczkiService.updateDateRange(this.range.controls.start.value, this.range.controls.end.value);
    this.wycieczkiService.updateCountries(this.countryFilter.countriesBoxes.reduce(function(filtered, option) {
      if(option.checked){
        filtered.push(option.name);
      }
      return filtered;      
    }, []));
    console.log("Submit");
  }

  clearFilters(){
    this.minValuePrice = this.minPrice;
    this.maxValuePrice = this.maxPrice;
    this.range.controls.start.setValue(this.wycieczkiService.getMinStartDate());
    this.range.controls.end.setValue(this.wycieczkiService.getMaxEndDate());
    this.countryFilter.countriesBoxes.forEach(obj =>
      obj.checked = true
    )
    this.onSubmit();
    
    this.countryFilter.countriesBoxes.forEach(obj =>
      obj.checked = false
    )
  }
}
