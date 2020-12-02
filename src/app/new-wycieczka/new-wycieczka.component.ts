import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { WycieczkaData } from '../interfaces/wycieczkaData'
import { add } from 'date-fns';
import { WycieczkiServiceService } from '../services/wycieczki-service.service';
import { DbService } from '../services/db.service';

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
      image_url: ['', Validators.required],
      cyclic: ['', Validators.required],
      cyclic_label: [''],
      cyclic_long: [''],
      cyclic_label_long: [''],
      gallery: ['', Validators.required],
      gallery1: [''],
      gallery2: [''],
      gallery3: [''],
    }, {
      validators: [this.galleryValidators, 
        this.cyclicLabelValidators,
        this.cyclicLongValidators,
        this.cyclicLabelLongValidators]
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
        
        // rating_count: 0,
        // gallery: [],
        // cyclic: 
      }

      if(modelForm.value.cyclic){
          wycieczka.cyclic = {
            long: modelForm.value.cyclic_long,
          }      
          switch(modelForm.value.cyclic_label) {
            case "days": {
              wycieczka.cyclic.days = modelForm.value.cyclic_label_long;
              break;
            }
            case "weeks": {
              wycieczka.cyclic.weeks = modelForm.value.cyclic_label_long;
              break;
            }
            case "months": {
              wycieczka.cyclic.months = modelForm.value.cyclic_label_long;
              break;
            }
          }
      }
      if(modelForm.value.gallery){
        wycieczka.gallery = []
        if(modelForm.value.gallery1){
          wycieczka.gallery.push(modelForm.value.gallery1);
        }
        if(modelForm.value.gallery2){
          wycieczka.gallery.push(modelForm.value.gallery2);
        }
        if(modelForm.value.gallery3){
          wycieczka.gallery.push(modelForm.value.gallery3);
        }
      }
      
      console.log(wycieczka);
      this.wycieczkiService.addWycieczka(wycieczka);
      // this.wycieczkiService.addProduct(wycieczka);
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
  
  // Validators -----------------------------------------------------------------
    
  galleryValidators(formGroup: FormGroup) {
    if (formGroup.value.gallery) {
      return Validators.required(formGroup.get('gallery1')) ? {
        ConditionallyRequired: true,
      } : null;
    }
    return null;
  }
  
  cyclicLabelValidators(formGroup: FormGroup) {
    if (formGroup.value.cyclic) {
      return Validators.required(formGroup.get('cyclic_label')) ? {
        ConditionallyRequired: true,
      } : null;
    }
    return null;
  }

  cyclicLongValidators(formGroup: FormGroup) {
    if (formGroup.value.cyclic) {
      return Validators.required(formGroup.get('cyclic_long')) ? {
        ConditionallyRequired: true,
      } : null;
    }
    return null;
  }

  cyclicLabelLongValidators(formGroup: FormGroup) {
    if (formGroup.value.cyclic) {
      return Validators.required(formGroup.get('cyclic_label_long')) ? {
        ConditionallyRequired: true,
      } : null;
    }
    return null;
  }
}
