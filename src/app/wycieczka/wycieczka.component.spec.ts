import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WycieczkaComponent } from './wycieczka.component';
import { WycieczkaData } from '../interfaces/wycieczkaData';
import { of } from 'rxjs';
import { add } from 'date-fns';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MockAuthService } from '../services/auth.service.mock';
import { MockWycieczkiServiceService } from '../services/wycieczki-service.service.mock';
import { WycieczkiServiceService } from '../services/wycieczki-service.service';

const wycieczkaMock = <WycieczkaData>{
    id : 0,
    name: 'Podróż po Polsce',
    country: 'Polska',
    startDate: add(new Date(), { days: 2 }),
    endDate: add(new Date(), { days: 8 }),
    description: 'Najpekniejsze miejsca w Polsce',
    image_url: './assets/01.png',
    price: 1000,
    currency: "PLN",
    // seats: 20,
    avaible_seats: 20,
    plus_show: true,
    minus_show: false,
    rating: 0,
    rating_count: 0,
    gallery:[
        './assets/4.jpg',
        './assets/5.jpg',
        './assets/6.jpg'
    ],
    comments:[
        {
            author: "Uma",
            comment: "Nice one"
        },
        {
            author: "Roma",
            comment: "Ok"
        }
    ],
    cyclic:{
        long: 5,
        months: 1,
    }
}

describe('WycieczkaComponent', () => {
  let component: WycieczkaComponent;
  let fixture: ComponentFixture<WycieczkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WycieczkaComponent ],
      providers:[
        WycieczkaComponent,
        { provide: AuthService, useClass: MockAuthService },
        { provide: WycieczkiServiceService, useClass: MockWycieczkiServiceService },  
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WycieczkaComponent);
    component = fixture.componentInstance;
    component.data = wycieczkaMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
