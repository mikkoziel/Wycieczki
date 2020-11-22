import { Component, HostListener, OnInit } from '@angular/core';
import { WycieczkaComponent } from './wycieczka/wycieczka.component';
import { ListaWycieczekComponent } from './lista-wycieczek/lista-wycieczek.component';
import { KoszykComponent } from './koszyk/koszyk.component';
import { WycieczkaData } from './wycieczkaData';

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

  @HostListener('window:scroll', [])
  onScroll() {
    var header = document.getElementById("header");
    var sticky = header.offsetTop;
    console.log(sticky)
    console.log(window.pageYOffset)
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }
  
}