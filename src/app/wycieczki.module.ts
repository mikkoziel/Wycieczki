import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';

import { WycieczkiComponent } from './wycieczki.component';
import { WycieczkaComponent } from './wycieczka/wycieczka.component';
import { ListaWycieczekComponent } from './lista-wycieczek/lista-wycieczek.component';
import { OcenaComponent } from './ocena/ocena.component';
import { NewWycieczkaComponent } from './new-wycieczka/new-wycieczka.component';
import { KoszykComponent } from './koszyk/koszyk.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { KoszykMainComponent } from './koszyk-main/koszyk-main.component';
import { FilterComponent } from './filter/filter.component';
import { WycieczkaDetailsComponent } from './wycieczka-details/wycieczka-details.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ConfirmReservationComponent } from './confirm-reservation/confirm-reservation.component';

import { MinPriceProductPipe } from './pipes/min-price-product.pipe';
import { MaxPriceProductPipe } from './pipes/max-price-product.pipe';
import { StartDatePipe } from './pipes/start-date.pipe';
import { EndDatePipe } from './pipes/end-date.pipe';
import { CountryFilterPipe } from './pipes/country-filter.pipe';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from "@angular/fire/storage";

import { environment } from '../environments/environment';
import { UpdateWycieczkaComponent } from './update-wycieczka/update-wycieczka.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthService } from './services/auth.service';
import { WycieczkiServiceService } from './services/wycieczki-service.service';
import { KoszykService } from './services/koszyk.service';
import { DbService } from './services/db.service';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { RouterModule } from '@angular/router';

const components =[
  WycieczkiComponent,
  WycieczkaComponent,
  ListaWycieczekComponent,
  OcenaComponent,
  KoszykComponent,
  NewWycieczkaComponent,
  HeaderComponent,
  KoszykMainComponent,
  FilterComponent,
  WycieczkaDetailsComponent,
  LoginComponent,
  CreateAccountComponent,
  ConfirmReservationComponent,
  UpdateWycieczkaComponent,
  AdminPanelComponent,
]

const pipes =[
  MinPriceProductPipe,
  MaxPriceProductPipe,
  StartDatePipe,
  EndDatePipe,
  CountryFilterPipe,
]

const services =[
  AuthService,
  DbService,
  InMemoryDataService,
  KoszykService,
  WycieczkiServiceService
]

const guards = [
  AdminGuard,
  AuthGuard
]

const materials = [
  MatSliderModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRippleModule,
  MatDividerModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatInputModule,
  FormsModule,
  MatSelectModule,
  MatTabsModule,
  MatButtonToggleModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatExpansionModule,
]

const firebases = [
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFireAuthModule, // do obsługi autentykacji
  AngularFireDatabaseModule,
  AngularFireStorageModule,
]

@NgModule({
  declarations: [
    components,
    pipes,
       
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, 
      { dataEncapsulation: false }),
    firebases,
    materials,
    RouterModule
  ],
  exports:[
    MatSliderModule,
  ],
  providers: [
    services,
    guards
  ],
  bootstrap: [WycieczkiComponent]
})
export class WycieczkiModule { }
