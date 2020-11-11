import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WycieczkiComponent } from './wycieczki.component';
import { WycieczkaComponent } from './wycieczka/wycieczka.component';

@NgModule({
  declarations: [
    WycieczkiComponent,
    WycieczkaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [WycieczkiComponent]
})
export class WycieczkiModule { }
