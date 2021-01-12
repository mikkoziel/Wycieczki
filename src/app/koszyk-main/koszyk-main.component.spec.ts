import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { KoszykService } from '../services/koszyk.service';
import { MockKoszykService } from '../services/koszyk.service.mock';

import { KoszykMainComponent } from './koszyk-main.component';

describe('KoszykMainComponent', () => {
  let component: KoszykMainComponent;
  let fixture: ComponentFixture<KoszykMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KoszykMainComponent ],
      providers:[
        KoszykMainComponent,
        { provide: KoszykService, useClass: MockKoszykService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KoszykMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('contains h2', () => {
    const h2 = fixture.debugElement.query(By.css('#h2')).nativeElement;
    expect(h2).toBeTruthy();
    });
    
  it('contains seats', () => {
    const seats = fixture.debugElement.query(By.css('#seats')).nativeElement;
    expect(seats).toBeTruthy();
    });
    
  it('contains total', () => {
    const total = fixture.debugElement.query(By.css('#total')).nativeElement;
    expect(total).toBeTruthy();
    });
    
  it('contains bttn', () => {
    const bttn = fixture.debugElement.query(By.css('#bttn')).nativeElement;
    expect(bttn).toBeTruthy();
    });
    
});
