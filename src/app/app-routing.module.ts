import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KoszykComponent } from './koszyk/koszyk.component';
import { NewWycieczkaComponent } from './new-wycieczka/new-wycieczka.component';
import { ListaWycieczekComponent } from './lista-wycieczek/lista-wycieczek.component';
import { WycieczkaDetailsComponent } from './wycieczka-details/wycieczka-details.component';
import { ConfirmReservationComponent } from './confirm-reservation/confirm-reservation.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { UpdateWycieczkaComponent } from './update-wycieczka/update-wycieczka.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [
    { path: '', component: ListaWycieczekComponent },
    { path: 'cart', component: KoszykComponent },
    { path: 'new-trip', component: NewWycieczkaComponent },
    { path: 'trip-details/:id', component: WycieczkaDetailsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: CreateAccountComponent },
    { path: 'confirm', component: ConfirmReservationComponent },
    { path: 'update-trip/:id', component:UpdateWycieczkaComponent },
    { path: 'admin-panel', component:AdminPanelComponent },
  ];
  // 

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AppRoutingModule { }