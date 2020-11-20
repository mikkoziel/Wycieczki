import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WycieczkiComponent } from './wycieczki.component';
import { WycieczkaComponent } from './wycieczka/wycieczka.component';
import { ListaWycieczekComponent } from './lista-wycieczek/lista-wycieczek.component';
import { OcenaComponent } from './ocena/ocena.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewWycieczkaModule } from './new-wycieczka/new-wycieczka.module';
import { KoszykModule } from './koszyk/koszyk.module';

@NgModule({
  declarations: [
    WycieczkiComponent,
    WycieczkaComponent,
    ListaWycieczekComponent,
    OcenaComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NewWycieczkaModule,
    KoszykModule
  ],
  providers: [
  ],
  bootstrap: [WycieczkiComponent]
})
export class WycieczkiModule { }
