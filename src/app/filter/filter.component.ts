import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { WycieczkiServiceService } from '../wycieczki-service.service';

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
  enabled =true;

  constructor(private wycieczkiService: WycieczkiServiceService) { }

  ngOnInit(): void {
    this.minPrice = this.wycieczkiService.getMinPrice();
    this.minValuePrice = this.minPrice;
    this.maxPrice = this.wycieczkiService.getMaxPrice();
    this.maxValuePrice = this.maxPrice;
  }

  getMinPrice(event: any) {
    console.log(event.value);
    if(event.value >= this.maxValuePrice){
      this.maxValuePrice = event.value;
    } 
    this.minValuePrice = event.value;
  }

  getMaxPrice(event: any) {
    console.log(event.value);
    if(event.value <= this.minValuePrice){
      this.minValuePrice = event.value;
    } 
    this.maxValuePrice = event.value;
  }

  onSubmit(){
    console.log("Submit");
  }
}
