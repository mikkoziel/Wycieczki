import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WycieczkaDetailsComponent } from './wycieczka-details.component';

describe('WycieczkaDetailsComponent', () => {
  let component: WycieczkaDetailsComponent;
  let fixture: ComponentFixture<WycieczkaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WycieczkaDetailsComponent ]
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
});
