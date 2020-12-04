import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WycieczkaData } from '../interfaces/wycieczkaData';
import { WycieczkiServiceService } from '../services/wycieczki-service.service';

@Component({
  selector: 'app-update-wycieczka',
  templateUrl: './update-wycieczka.component.html',
  styleUrls: ['./update-wycieczka.component.css']
})
export class UpdateWycieczkaComponent implements OnInit {
  id: number;
  modelForm: FormGroup;
  errors = [];
  data: WycieczkaData;
  sub: Subscription;

  cyclic_default: boolean = false;

  constructor(private _Activatedroute: ActivatedRoute,
    private formBuilder : FormBuilder,
    private wycieczkiService: WycieczkiServiceService) {
      
     }

  ngOnInit(): void {
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
      this.id = Number(params.get('id')); 
      this.wycieczkiService.getDBWycieczkaOb(this.id.toString())
          .subscribe(product=>{
            this.data = product;
                
            this.modelForm = this.formBuilder.group({
              name: [this.data.name, Validators.required],
              country: [this.data.country, Validators.required],
              startDate: [this.data.startDate, Validators.required],
              endDate: [this.data.endDate, Validators.required],
              price: [this.data.price, [Validators.pattern('[0-9]*'), Validators.required]],
              seats: [this.data.seats, [Validators.pattern('[0-9]*'), Validators.required]],
              description: [this.data.description, Validators.required],
              image_url: [this.data.image_url, Validators.required],
              cyclic: ["", Validators.required],
              cyclic_long: [this.data.cyclic ? this.data.cyclic.long: ""],
              cyclic_label: [this.data.cyclic ? true: false],
              cyclic_label_long: [this.data.cyclic ? this.data.cyclic.long: ""],
              gallery: [this.data.gallery ? true: false, Validators.required],
              gallery1: [this.data.gallery ? this.data.gallery[0]: ""],
              gallery2: [this.data.gallery ? this.data.gallery[1]: ""],
              gallery3: [this.data.gallery ? this.data.gallery[2]: ""],
            }, {
              validators: [this.galleryValidators, 
                this.cyclicLabelValidators,
                this.cyclicLongValidators,
                this.cyclicLabelLongValidators]
            });

            this.cyclic_default = this.data.cyclic ? true: false;
          });
        }
      );

  }

  
  public onValChange(val: boolean) {
    this.cyclic_default = val;
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
      // this.wycieczkiService.addWycieczka(wycieczka);
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
