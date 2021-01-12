import { ComponentFixture, TestBed } from '@angular/core/testing';
import { add } from 'date-fns';
import { WycieczkaData } from '../interfaces/wycieczkaData';
import { AuthService } from '../services/auth.service';
import { MockAuthService } from '../services/auth.service.mock';
import { DbService } from '../services/db.service';
import { MockDbService } from '../services/db.service.mock';

import { OcenaComponent } from './ocena.component';
import { Wycieczki } from "../mock";

const wycieczkaMock = Wycieczki[0]

describe('OcenaComponent', () => {
  let component: OcenaComponent;
  let fixture: ComponentFixture<OcenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcenaComponent ],
      providers:[
        { provide: AuthService, useClass: MockAuthService },
        { provide: DbService, useClass: MockDbService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcenaComponent);
    component = fixture.componentInstance;
    component.wycieczka = wycieczkaMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
