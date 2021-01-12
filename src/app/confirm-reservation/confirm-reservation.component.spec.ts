import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { MockAuthService } from '../services/auth.service.mock';
import { KoszykService } from '../services/koszyk.service';
import { MockKoszykService } from '../services/koszyk.service.mock';

import { ConfirmReservationComponent } from './confirm-reservation.component';

describe('ConfirmReservationComponent', () => {
  let component: ConfirmReservationComponent;
  let fixture: ComponentFixture<ConfirmReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ ConfirmReservationComponent ],
      providers:[
        {provide: AuthService, useClass: MockAuthService},
        {provide: KoszykService, useClass: MockKoszykService},

      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('contains h3', () => {
    const h3 = fixture.debugElement.query(By.css('#h3')).nativeElement;
    expect(h3).toBeTruthy();
    });
    
});
