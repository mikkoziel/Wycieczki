import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KoszykComponent } from './koszyk/koszyk.component';
import { NewWycieczkaComponent } from './new-wycieczka/new-wycieczka.component';
import { ListaWycieczekComponent } from './lista-wycieczek/lista-wycieczek.component';
import { WycieczkaDetailsComponent } from './wycieczka-details/wycieczka-details.component';

const routes: Routes = [
    { path: '', component: ListaWycieczekComponent },
    { path: 'cart', component: KoszykComponent },
    { path: 'new-trip', component: NewWycieczkaComponent },
    { path: 'trip-details/:id', component: WycieczkaDetailsComponent },
  ];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }