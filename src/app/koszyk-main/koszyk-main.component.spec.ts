import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KoszykMainComponent } from './koszyk-main.component';

describe('KoszykMainComponent', () => {
  let component: KoszykMainComponent;
  let fixture: ComponentFixture<KoszykMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KoszykMainComponent ]
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
});
