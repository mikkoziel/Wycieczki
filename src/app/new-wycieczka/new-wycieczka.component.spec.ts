import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { WycieczkiServiceService } from '../services/wycieczki-service.service';
import { MockWycieczkiServiceService } from '../services/wycieczki-service.service.mock';

import { NewWycieczkaComponent } from './new-wycieczka.component';

describe('NewWycieczkaComponent', () => {
  let component: NewWycieczkaComponent;
  let fixture: ComponentFixture<NewWycieczkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWycieczkaComponent ],
      providers:[
        NewWycieczkaComponent,
        { provide: WycieczkiServiceService, useClass: MockWycieczkiServiceService },
        FormBuilder,
      ]
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
