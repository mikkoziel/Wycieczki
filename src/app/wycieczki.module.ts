import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WycieczkiComponent } from './wycieczki.component';
import { WycieczkaComponent } from './wycieczka/wycieczka.component';
import { ListaWycieczekComponent } from './lista-wycieczek/lista-wycieczek.component';
import { WycieczkaData } from './wycieczkaData';

@NgModule({
  declarations: [
    WycieczkiComponent,
    WycieczkaComponent,
    ListaWycieczekComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    WycieczkaData
  ],
  bootstrap: [WycieczkiComponent]
})
export class WycieczkiModule { }
