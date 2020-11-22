import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';

import { WycieczkiComponent } from './wycieczki.component';
import { WycieczkaComponent } from './wycieczka/wycieczka.component';
import { ListaWycieczekComponent } from './lista-wycieczek/lista-wycieczek.component';
import { OcenaComponent } from './ocena/ocena.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewWycieczkaComponent } from './new-wycieczka/new-wycieczka.component';
import { KoszykComponent } from './koszyk/koszyk.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { KoszykMainComponent } from './koszyk-main/koszyk-main.component';
import { FilterComponent } from './filter/filter.component';

import { MinPriceProductPipe } from './Pipes/min-price-product.pipe';
import { MaxPriceProductPipe } from './Pipes/max-price-product.pipe';

@NgModule({
  declarations: [
    WycieczkiComponent,
    WycieczkaComponent,
    ListaWycieczekComponent,
    OcenaComponent,
    KoszykComponent,
    NewWycieczkaComponent,
    HeaderComponent,
    KoszykMainComponent,
    FilterComponent,
    MinPriceProductPipe,
    MaxPriceProductPipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatDividerModule,
  ],
  exports:[
    MatSliderModule,
  ],
  providers: [
  ],
  bootstrap: [WycieczkiComponent]
})
export class WycieczkiModule { }
