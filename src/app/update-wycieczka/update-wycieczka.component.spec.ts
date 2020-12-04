import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWycieczkaComponent } from './update-wycieczka.component';

describe('UpdateWycieczkaComponent', () => {
  let component: UpdateWycieczkaComponent;
  let fixture: ComponentFixture<UpdateWycieczkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWycieczkaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWycieczkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
