import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WycieczkiComponent } from './wycieczki.component';
import { WycieczkaComponent } from './wycieczka/wycieczka.component';
import { ListaWycieczekComponent } from './lista-wycieczek/lista-wycieczek.component';
import { OcenaComponent } from './ocena/ocena.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewWycieczkaModule } from './new-wycieczka/new-wycieczka.module';

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
    NewWycieczkaModule
  ],
  providers: [
  ],
  bootstrap: [WycieczkiComponent]
})
export class WycieczkiModule { }
