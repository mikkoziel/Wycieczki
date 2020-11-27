import { Component, OnInit, Input } from '@angular/core';
import { WycieczkaData } from '../interfaces/wycieczkaData';

@Component({
  selector: 'app-ocena',
  templateUrl: './ocena.component.html',
  styleUrls: ['./ocena.component.css']
})
export class OcenaComponent implements OnInit {
  @Input() wycieczka: WycieczkaData;
  readonly = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
