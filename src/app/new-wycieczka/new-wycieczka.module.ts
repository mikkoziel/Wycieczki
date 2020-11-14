import { ReactiveFormsModule } from '@angular/forms';
import { NgModule}      from '@angular/core';
import { CommonModule}      from '@angular/common';

import { NewWycieczkaComponent } from './new-wycieczka.component'

@NgModule({
 imports: [
  CommonModule,
  ReactiveFormsModule
 ],
 declarations: [
    NewWycieczkaComponent
  ],
  exports: [NewWycieczkaComponent]
})
export class NewWycieczkaModule { }