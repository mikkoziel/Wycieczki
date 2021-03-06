import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { WycieczkaData } from '../interfaces/wycieczkaData';
import { WycieczkiServiceService } from '../services/wycieczki-service.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-update-wycieczka',
  templateUrl: './update-wycieczka.component.html',
  styleUrls: ['./update-wycieczka.component.css'],
  providers: [DatePipe]
})
export class UpdateWycieczkaComponent implements OnInit {
  id: number;
  modelForm: FormGroup = null;
  errors = [];
  data: WycieczkaData;
  sub: Subscription;

  // cyclic_default: boolean;

  constructor(private _Activatedroute: ActivatedRoute,
    private router: Router,
    private formBuilder : FormBuilder,
    private wycieczkiService: WycieczkiServiceService,
    private datePipe: DatePipe) {
      
     }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      name: ["", Validators.required],
      country: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      price: ["", [Validators.pattern('[0-9]*'), Validators.required]],
      seats: ["", [Validators.pattern('[0-9]*'), Validators.required]],
      description: ["", Validators.required],
      image_url: ["", Validators.required],
      // cyclic: ["", Validators.required],
      cyclic_long: ["", [Validators.min(1)]],
      cyclic_label: [""],
      cyclic_label_long: [""],
      // gallery: ["", Validators.required],
      gallery1: [],
      gallery2: [""],
      gallery3: [""],
    }, {
      validators: [this.galleryValidators, 
        this.cyclicLabelValidators,
        this.cyclicLongValidators,
        this.cyclicLabelLongValidators]
    });

    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
      this.id = Number(params.get('id')); 
      this.wycieczkiService.getDBWycieczkaOb(this.id.toString())
          .subscribe(product=>{
            this.data = product;
            console.log(this.data.cyclic)
            let label = '';
            let label_long =0;
            if(this.data.cyclic?.days) {
                label_long = this.data.cyclic.days;
                label = "days"
            } else if(this.data.cyclic?.weeks){
              label_long = this.data.cyclic.weeks;
              label = "weeks"
            } else if(this.data.cyclic?.months){
              label_long = this.data.cyclic.months;
              label = "months"
            }
            
            this.modelForm.setValue({
              name: this.data.name,
              country: this.data.country,
              startDate: this.datePipe.transform(this.data.startDate,"yyyy-MM-dd"),
              endDate: this.datePipe.transform(this.data.endDate,"yyyy-MM-dd"),
              price: this.data.price,
              seats: this.data.avaible_seats,
              description: this.data.description,
              image_url: this.data.image_url,
              // cyclic: this.data.cyclic ? true : false,
              cyclic_long: this.data.cyclic.long,
              cyclic_label: label,
              cyclic_label_long: label_long,
              // gallery: this.data.gallery ? true: false,
              gallery1: this.data.gallery[0] ? this.data.gallery[0]: "",
              gallery2: this.data.gallery[1] ? this.data.gallery[1]: "",
              gallery3: this.data.gallery[2] ? this.data.gallery[2]: ""
            })    
            

          });
        }
      );
  }

  onSubmit(){
    this.errors = [];
    console.log(this.modelForm);

    if(this.modelForm.valid ){
      let wycieczka :WycieczkaData = {
        id: this.id,
        name: this.modelForm.value.name,
        country: this.modelForm.value.country,
        startDate: new Date(this.modelForm.value.startDate),
        endDate: new Date(this.modelForm.value.endDate),
        price: this.modelForm.value.price,
        currency: "PLN",
        seats: this.modelForm.value.seats,
        description: this.modelForm.value.description,
        image_url: this.modelForm.value.image_url,
        avaible_seats: this.modelForm.value.seats,
        plus_show: true,
        minus_show: false,
        rating: 0,
        rating_count: this.data.rating_count ? this.data.rating_count: 0,
        comments: this.data.comments ? this.data.comments: [],
        // gallery: [],
        // cyclic: 
      }

      wycieczka.cyclic = {
        long: this.modelForm.value.cyclic_long,
      }
      switch(this.modelForm.value.cyclic_label) {
        case "days": {
          wycieczka.cyclic.days = this.modelForm.value.cyclic_label_long;
          break;
        }
        case "weeks": {
          wycieczka.cyclic.weeks = this.modelForm.value.cyclic_label_long;
          break;
        }
        case "months": {
          wycieczka.cyclic.months = this.modelForm.value.cyclic_label_long;
          break;
        }
      }
      wycieczka.seats_taken = []
      for (var i=0; i<this.modelForm.value.cyclic_long; i++) {
        wycieczka.seats_taken.push(0);
      }
      wycieczka.gallery = []
      if(this.modelForm.value.gallery1){
        wycieczka.gallery.push(this.modelForm.value.gallery1);
      }
      if(this.modelForm.value.gallery2){
        wycieczka.gallery.push(this.modelForm.value.gallery2);
      }
      if(this.modelForm.value.gallery3){
        wycieczka.gallery.push(this.modelForm.value.gallery3);
      }
      
      console.log(wycieczka);
      this.router.navigateByUrl('/trip-list');
      // this.wycieczkiService.addWycieczka(wycieczka);
      this.wycieczkiService.updateWycieczkaDB(wycieczka);
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
