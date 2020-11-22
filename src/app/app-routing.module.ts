import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KoszykComponent } from './koszyk/koszyk.component';
import { NewWycieczkaComponent } from './new-wycieczka/new-wycieczka.component';
import { ListaWycieczekComponent } from './lista-wycieczek/lista-wycieczek.component';

const routes: Routes = [
    { path: '', component: ListaWycieczekComponent },
    { path: 'cart', component: KoszykComponent },
    { path: 'new-trip', component: NewWycieczkaComponent },
  ];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }