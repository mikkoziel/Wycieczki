import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { KoszykService } from '../services/koszyk.service';
import { MockAuthService } from '../services/auth.service.mock';
import { WycieczkiServiceService } from '../services/wycieczki-service.service';

import { WycieczkaDetailsComponent } from './wycieczka-details.component';
import { of } from 'rxjs';
import { MockWycieczkiServiceService } from '../services/wycieczki-service.service.mock';
import { MockKoszykService } from '../services/koszyk.service.mock';
import { Wycieczki } from "../mock";
import { DateRange, Order } from '../interfaces/order';

import 'jasmine';

const activatedRouteStub = {
  paramMap: {
    subscribe() {
      return of({id:1});
    }
  }
};

describe('WycieczkaDetailsComponent', () => {
  let component: WycieczkaDetailsComponent;
  let fixture: ComponentFixture<WycieczkaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WycieczkaDetailsComponent ],
      providers: [
        // HttpClientModule,
        WycieczkaDetailsComponent,
      { provide: AuthService, useClass: MockAuthService },
      { provide: ActivatedRoute, useValue: activatedRouteStub },
      { provide: WycieczkiServiceService, useClass: MockWycieczkiServiceService },
      { provide: KoszykService, useClass: MockKoszykService },
      
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WycieczkaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  // it('should generateRangeDates', () => {
  //   expect(component).toBeTruthy();
  //   component.data = Wycieczki[0];
  //   component.data.cyclic = {
  //       long: 1,
  //       days:1
  //   }
  //   component.rangeDates = [];
  //   fixture.detectChanges();
  //   expect(component.rangeDates.length).toEqual(0);

  //   component.generateRangeDates();
  //   fixture.detectChanges();

  //   expect(component.rangeDates.length).toEqual(1);
  // });
  
  it('should generateSeatsTaken', () => {
    expect(component).toBeTruthy();
    component.data = Wycieczki[0];
    component.rangeDates = [<DateRange>{startDate: null, endDate: null}];
    component.seats_taken= []
    fixture.detectChanges();
    expect(component.seats_taken.length).toEqual(0);

    component.generateSeatsTaken();
    fixture.detectChanges();

    expect(component.seats_taken.length).toEqual(1);
  });

  it('should reserveSeat', () => {
    let id = 0;
    expect(component).toBeTruthy();
    component.data = Wycieczki[0];
    component.rangeValue = <DateRange>{id: id, startDate: null, endDate: null};
    component.seats_taken= [<Order>{wycieczka:Wycieczki[0], quantity: 1}]
    fixture.detectChanges();
    expect(component.seats_taken[id].quantity).toEqual(1);

    component.reserveSeat();
    fixture.detectChanges();

    expect(component.seats_taken[id].quantity).toEqual(0);
  });

  
  it('should freeSeat', () => {
    let id = 0;
    expect(component).toBeTruthy();
    component.data = Wycieczki[0];
    component.id = Wycieczki[0].id;
    component.rangeValue = <DateRange>{id: id, startDate: null, endDate: null};
    component.seats_taken= [<Order>{wycieczka:Wycieczki[0], quantity: 1}]
    fixture.detectChanges();
    expect(component.seats_taken[id].quantity).toEqual(1);

    component.freeSeat();
    fixture.detectChanges();

    expect(component.seats_taken[id].quantity).toEqual(0);
  });
});
