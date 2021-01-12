import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryFilterPipe } from '../pipes/country-filter.pipe';
import { EndDatePipe } from '../pipes/end-date.pipe';
import { MaxPriceProductPipe } from '../pipes/max-price-product.pipe';
import { MinPriceProductPipe } from '../pipes/min-price-product.pipe';
import { StartDatePipe } from '../pipes/start-date.pipe';
import { WycieczkiServiceService } from '../services/wycieczki-service.service';
import { MockWycieczkiServiceService } from '../services/wycieczki-service.service.mock';

import { ListaWycieczekComponent } from './lista-wycieczek.component';

describe('ListaWycieczekComponent', () => {
  let component: ListaWycieczekComponent;
  let fixture: ComponentFixture<ListaWycieczekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ListaWycieczekComponent,
        CountryFilterPipe,
        EndDatePipe,
        MaxPriceProductPipe,
        MinPriceProductPipe,
        StartDatePipe,
      ],
      providers:[
        ListaWycieczekComponent,
        { provide: WycieczkiServiceService, useClass: MockWycieczkiServiceService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaWycieczekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
