import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { of } from 'rxjs';

import {Wycieczki} from '../mock';

import { DbService } from './db.service';

const ValueChangesStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(Wycieczki)),
  set: jasmine.createSpy('set'),
  update: jasmine.createSpy('update'),
  remove: jasmine.createSpy('remove'),
}
const AfDbObjectStub = {
  object: jasmine.createSpy('object').and.returnValue(ValueChangesStub),
  list: jasmine.createSpy('list').and.returnValue(ValueChangesStub),
}

describe('DbService', () => {
  let service: DbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        DbService,
        // AngularFireList,
        // AngularFireObject,
        { provide : AngularFireDatabase, useValue: AfDbObjectStub  },
      ]
    });
    service = TestBed.inject(DbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should get wycieczkiOb', () => {
    expect(service).toBeTruthy();
    service.wycieczkiOb;
  });
  
  it('should set wycieczkiOb', () => {
    expect(service).toBeTruthy();
    service.wycieczkiOb = of(Wycieczki);
  });
  
  it('should get wycieczkaOb', () => {
    expect(service).toBeTruthy();
    service.wycieczkaOb;
  });
  
  it('should set wycieczkaOb', () => {
    expect(service).toBeTruthy();
    service.wycieczkaOb = of(Wycieczki[0]);
  });
  
  it('should getWycieczkaOb', () => {
    expect(service).toBeTruthy();
    let id = '0';

    let retVal = service.getWycieczkaOb(id);
    // expect(retVal).toEqual(jasmine.objectContaining(Wycieczki[0]))
  });

  
  it('should addWycieczka defined properties', () => {
    expect(service).toBeTruthy();
    let wycieczka = Wycieczki[0];
    wycieczka.seats_taken= [0];

    service.addWycieczka(wycieczka);
  });
  
  it('should addWycieczka some undefined properties', () => {
    expect(service).toBeTruthy();
    let wycieczka = Wycieczki[1];
    wycieczka.rating_count= undefined;
    wycieczka.gallery= undefined;
    wycieczka.comments= undefined;
    wycieczka.cyclic= undefined;
    wycieczka.seats_taken= undefined;

    service.addWycieczka(wycieczka);
  });

  
  it('should convertWycieczka defined properties', () => {
    expect(service).toBeTruthy();
    let wycieczka = Wycieczki[0];
    wycieczka.seats_taken= [0];

    service.convertWycieczka(wycieczka);
  });
  
  it('should convertWycieczka some undefined properties', () => {
    expect(service).toBeTruthy();
    let wycieczka: any = Wycieczki[0];
    wycieczka.rating_count= undefined;
    wycieczka.gallery= undefined;
    wycieczka.comments= undefined;
    wycieczka.cyclic= undefined;
    wycieczka.seats_taken= undefined;
    wycieczka.uma = 0;

    let retVal = service.convertWycieczka(wycieczka);
    expect(retVal).not.toEqual(jasmine.objectContaining(wycieczka))
  });

  
  it('should updateWycieczkaId', () => {
    expect(service).toBeTruthy();
    let wycieczka = Wycieczki[0];
    wycieczka.seats_taken= [0];

    service.updateWycieczkaId(wycieczka);
  });
  
  it('should getImage', () => {
    expect(service).toBeTruthy();
    let path = "aa"

    let retVal = service.getImage(path);
    expect(retVal).toEqual(path);
  });

  it('should deleteWycieczka', () => {
    expect(service).toBeTruthy();
    let id = 0;
    
    service.deleteWycieczka(id);
  });
  
});
