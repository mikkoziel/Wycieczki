import { DatePipe } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { WycieczkiServiceService } from '../services/wycieczki-service.service';
import { MockWycieczkiServiceService } from '../services/wycieczki-service.service.mock';

import { UpdateWycieczkaComponent } from './update-wycieczka.component';
import { Wycieczki } from '../mock';
import { By } from '@angular/platform-browser';

const params = []
const activatedRouteStub = {
  paramMap: {
    subscribe() {
      return of(params['id']='1');
    }
  }
};

const routes: Routes = [
  { path: 'trip-list', redirectTo: "/"},
];

describe('UpdateWycieczkaComponent', () => {
  let component: UpdateWycieczkaComponent;
  let fixture: ComponentFixture<UpdateWycieczkaComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [ UpdateWycieczkaComponent ],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: activatedRouteStub } ,
        { provide: WycieczkiServiceService, useClass: MockWycieczkiServiceService },
        DatePipe
      ]
    })
    .compileComponents();
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWycieczkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onSubmit not valid', () => {
    expect(component).toBeTruthy();
    component.onSubmit()
    expect(component.errors.length).toEqual(8)
    expect(component.modelForm.valid).toBeFalsy();
  });

  it('should onSubmit valid days', fakeAsync(() => {
    expect(component).toBeTruthy();
    const navigateSpy = spyOn(router, 'navigateByUrl');

    let wycieczka = Wycieczki[0];
    wycieczka.cyclic = {
      long: 1,
      days:1
    }
    component.modelForm.setValue({
      name: wycieczka.name,
      country: wycieczka.country,
      startDate: "2000-01-01",
      endDate: "2000-01-01",
      price: wycieczka.price,
      seats: wycieczka.avaible_seats,
      description: wycieczka.description,
      image_url: wycieczka.image_url,
      cyclic_long: wycieczka.cyclic.long,
      cyclic_label: "days",
      cyclic_label_long: 2,
      gallery1: wycieczka.gallery[0],
      gallery2: wycieczka.gallery[1],
      gallery3: wycieczka.gallery[2]
    }) 
    component.data = wycieczka;
    fixture.detectChanges();
    tick();    

    component.onSubmit();

    expect(component.modelForm.valid).toBeTruthy();
    expect(navigateSpy).toHaveBeenCalledWith('/trip-list');
  }));

  
  it('should onSubmit valid weeks', fakeAsync(() => {
    expect(component).toBeTruthy();
    const navigateSpy = spyOn(router, 'navigateByUrl');

    let wycieczka = Wycieczki[0];
    component.modelForm.setValue({
      name: wycieczka.name,
      country: wycieczka.country,
      startDate: "2000-01-01",
      endDate: "2000-01-01",
      price: wycieczka.price,
      seats: wycieczka.avaible_seats,
      description: wycieczka.description,
      image_url: wycieczka.image_url,
      cyclic_long: 1,
      cyclic_label: "weeks",
      cyclic_label_long: 2,
      gallery1: null,
      gallery2: null,
      gallery3: null
    }) 
    component.data = wycieczka;
    fixture.detectChanges();
    tick();    

    component.onSubmit();

    expect(component.modelForm.valid).toBeTruthy();
    expect(navigateSpy).toHaveBeenCalledWith('/trip-list');
  }));

  
  it('should onSubmit valid months', fakeAsync(() => {
    expect(component).toBeTruthy();
    const navigateSpy = spyOn(router, 'navigateByUrl');

    let wycieczka = Wycieczki[1];
    component.modelForm.setValue({
      name: wycieczka.name,
      country: wycieczka.country,
      startDate: "2000-01-01",
      endDate: "2000-01-01",
      price: wycieczka.price,
      seats: wycieczka.avaible_seats,
      description: wycieczka.description,
      image_url: wycieczka.image_url,
      cyclic_long: 1,
      cyclic_label: "months",
      cyclic_label_long: 2,
      gallery1: null,
      gallery2: null,
      gallery3: null
    }) 
    component.data = wycieczka;
    fixture.detectChanges();
    tick();    

    component.onSubmit();

    expect(component.modelForm.valid).toBeTruthy();
    expect(navigateSpy).toHaveBeenCalledWith('/trip-list');
  }));
});
