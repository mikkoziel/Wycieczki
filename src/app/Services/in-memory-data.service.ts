import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Wycieczki } from '../mock';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const wycieczki = [...Wycieczki];
    return {wycieczki};
  }

  constructor() {
  }
}
