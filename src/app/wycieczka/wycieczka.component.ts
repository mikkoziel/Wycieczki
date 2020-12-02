import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { WycieczkaData } from '../interfaces/wycieczkaData';
import { DbService } from '../services/db.service';
import { KoszykService } from '../services/koszyk.service';
import { WycieczkiServiceService } from '../services/wycieczki-service.service';

@Component({
  selector: 'app-wycieczka',
  templateUrl: './wycieczka.component.html',
  styleUrls: ['./wycieczka.component.css']
})

export class WycieczkaComponent implements OnInit {
  @Input() data: WycieczkaData;
  @Output() deleteWycieczkaEmmiter = new EventEmitter<WycieczkaData>();

  constructor(
    private route: ActivatedRoute,
    private wycieczkiService: WycieczkiServiceService,
    private koszykService: KoszykService,
    private dbService: DbService ){
  }

  ngOnInit(): void {
  }

  onDeletePress(): void {
    this.deleteWycieczkaEmmiter.emit(this.data);
  }

  getImage(path: string){//: Observable<string | null>{
    return this.wycieczkiService.getImageFromDB(path);
  }

}