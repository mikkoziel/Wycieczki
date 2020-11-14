import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWycieczkaComponent } from './new-wycieczka.component';

describe('NewWycieczkaComponent', () => {
  let component: NewWycieczkaComponent;
  let fixture: ComponentFixture<NewWycieczkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWycieczkaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWycieczkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
