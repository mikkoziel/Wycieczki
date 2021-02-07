import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { WycieczkiServiceService } from '../services/wycieczki-service.service';
import { MockWycieczkiServiceService } from '../services/wycieczki-service.service.mock';

import { FilterComponent } from './filter.component';

class MockRouter {
 // Router
 public events = of( new NavigationEnd(0, 'http://localhost:4200/login', 'http://localhost:4200/login'));
}

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // imports: [RouterTestingModule],
      declarations: [ FilterComponent ],
      providers:[
        FilterComponent,
        { provide: WycieczkiServiceService, useClass: MockWycieczkiServiceService },
        {provide: Router, useClass: MockRouter}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get( Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should getMinPriceFilter greather than maaxValuePrice', () => {
    expect(component).toBeTruthy();
    component.maxValuePrice = 0;
    component.minValuePrice = 0;
    fixture.detectChanges();

    let event = {
      value: 15
    }
    
    component.getMinPriceFilter(event)
    fixture.detectChanges();
    expect(component.maxValuePrice).toEqual(15)
    expect(component.minValuePrice).toEqual(15)
  });

  
  it('should getMinPriceFilter not greather than maaxValuePrice', () => {
    expect(component).toBeTruthy();
    component.maxValuePrice = 100;
    component.minValuePrice = 0;
    fixture.detectChanges();

    let event = {
      value: 15
    }
    
    component.getMinPriceFilter(event)
    fixture.detectChanges();
    expect(component.maxValuePrice).toEqual(100)
    expect(component.minValuePrice).toEqual(15)
  });

  
  it('should getMaxPriceFilter lower than minValuePrice', () => {
    expect(component).toBeTruthy();
    component.maxValuePrice = 0;
    component.minValuePrice = 100;
    fixture.detectChanges();

    let event = {
      value: 15
    }
    
    component.getMaxPriceFilter(event)
    fixture.detectChanges();
    expect(component.maxValuePrice).toEqual(15)
    expect(component.minValuePrice).toEqual(15)
  });

  
  it('should getMaxPriceFilter not lower than minValuePrice', () => {
    expect(component).toBeTruthy();
    component.maxValuePrice = 100;
    component.minValuePrice = 0;
    fixture.detectChanges();

    let event = {
      value: 15
    }
    
    component.getMaxPriceFilter(event)
    fixture.detectChanges();
    expect(component.maxValuePrice).toEqual(15)
    expect(component.minValuePrice).toEqual(0)
  });
  
  it('should onSubmit', () => {
    expect(component).toBeTruthy();
    component.maxValuePrice = 100;
    component.minPrice = 15;
    component.minValuePrice = 100;
    component.maxPrice = 15;
    fixture.detectChanges();

    component.onSubmit()
    fixture.detectChanges();
    // expect(component.maxValuePrice).toEqual(15)
    // expect(component.minValuePrice).toEqual(15)
    // expect(component.rangeValue.controls.start).toEqual(15)
  });
});
