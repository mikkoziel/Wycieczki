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
      cyclic: ["", Validators.required],
      cyclic_long: [""],
      cyclic_label: [""],
      cyclic_label_long: [""],
      gallery: ["", Validators.required],
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
            this.modelForm.setValue({
              name: this.data.name,
              country: this.data.country,
              startDate: this.datePipe.transform(this.data.startDate,"yyyy-MM-dd"),
              endDate: this.datePipe.transform(this.data.endDate,"yyyy-MM-dd"),
              price: this.data.price,
              seats: this.data.avaible_seats,
              description: this.data.description,
              image_url: this.data.image_url,
              cyclic: this.data.cyclic ? true : false,
              cyclic_long: this.data.cyclic ? this.data.cyclic.long: "",
              cyclic_label: this.data.cyclic ? true: false,
              cyclic_label_long: this.data.cyclic ? this.data.cyclic.long: "",
              gallery: this.data.gallery ? true: false,
              gallery1: this.data.gallery[0] ? this.data.gallery[0]: "",
              gallery2: this.data.gallery[1] ? this.data.gallery[1]: "",
              gallery3: this.data.gallery[2] ? this.data.gallery[2]: ""
            })    
            

            // this.cyclic_default = this.data.cyclic ? true: false;
          });
        }
      );
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
        rating_count: this.data.rating_count ? this.data.rating_count: 0,
        comments: this.data.comments ? this.data.comments: [],
        // gallery: [],
        // cyclic: 
      }

      if(modelForm.value.cyclic){
          wycieczka.cyclic = {
            long: modelForm.value.cyclic_long,
          }
          wycieczka.seats_taken = [].fill(0, 0, modelForm.value.cyclic_long)      
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
      } else {
        wycieczka.cyclic = null
        wycieczka.seats_taken = [0]
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
      } else {
        wycieczka.gallery = null
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
