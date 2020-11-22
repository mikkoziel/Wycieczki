import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { WycieczkaData } from '../wycieczkaData'
import { add } from 'date-fns';
import { WycieczkiServiceService } from '../wycieczki-service.service';

@Component({
  selector: 'app-new-wycieczka',
  templateUrl: './new-wycieczka.component.html',
  styleUrls: ['./new-wycieczka.component.css']
})
export class NewWycieczkaComponent implements OnInit {
  modelForm: FormGroup;
  errors = [];
  @Output() addWycieczkaEmmiter = new EventEmitter<WycieczkaData>();


  constructor(
    private route: ActivatedRoute,
    private formBuilder : FormBuilder,
    private wycieczkiService: WycieczkiServiceService) { 

    }

  ngOnInit() : void {
    this.modelForm = this.formBuilder.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      price: ['', [Validators.pattern('[0-9]*'), Validators.required]],
      seats: ['', [Validators.pattern('[0-9]*'), Validators.required]],
      description: ['', Validators.required],
      image_url: ['', Validators.required]
    });
  }

  onSubmit(modelForm: FormGroup){
    this.errors = [];
    console.log(modelForm);

    if(modelForm.valid && modelForm.touched){
      let wycieczka :WycieczkaData = {
        id: 0,
        name: modelForm.value.name,
        country: modelForm.value.country,
        startDate: new Date(modelForm.value.startDate),
        endDate: new Date(modelForm.value.endDate),
        price: modelForm.value.price,
        currency: "PLN",
        seats: modelForm.value.seats,
        description: modelForm.value.description,
        image_url: modelForm.value.image_url,
        avaible_seats: modelForm.value.seats,
        plus_show: true,
        minus_show: false,
        rating: 0,
        rating_count: 0,
      }
      console.log(wycieczka);
      this.wycieczkiService.addProduct(wycieczka);
    }
    else{
      this.getFormValidationErrors();
      if(this.errors.length == 0){
        this.errors.push("Fill all fields");
      }
    }
  }

  getFormValidationErrors() {
    Object.keys(this.modelForm.controls).forEach(key => {
  
    const controlErrors: ValidationErrors = this.modelForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            this.errors.push("Wrong value in " + key + " field")
          });
        }
      });
    }
  

}
