import { Component, OnInit } from '@angular/core';
import { WycieczkaComponent } from './wycieczka/wycieczka.component';
import { ListaWycieczekComponent } from './lista-wycieczek/lista-wycieczek.component';
import { KoszykComponent } from './koszyk/koszyk.component';

@Component({
  selector: 'app-root',
  templateUrl: './wycieczki.component.html',
  styleUrls: ['./wycieczki.component.css']
})

export class WycieczkiComponent implements OnInit{
  title = 'Projekt';

  constructor() {};

  ngOnInit(): void {
  }

  
  
}