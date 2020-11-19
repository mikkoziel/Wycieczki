import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { KoszykComponent } from './koszyk.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    KoszykComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  bootstrap: [KoszykComponent]
})
export class KoszykModule { }
