import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WycieczkaComponent } from './wycieczka.component';
import { WycieczkaData } from '../wycieczkaData';

describe('WycieczkaComponent', () => {
  let component: WycieczkaComponent;
  let fixture: ComponentFixture<WycieczkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WycieczkaComponent ],
      providers: [WycieczkaData]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WycieczkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
