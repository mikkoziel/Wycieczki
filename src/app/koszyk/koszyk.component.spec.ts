import { TestBed } from '@angular/core/testing';
import { KoszykService } from '../services/koszyk.service';
import { KoszykComponent } from './koszyk.component';

class MockKoszykService{
  getItems(){
    return [];
  }
}

describe('WycieczkiComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        KoszykComponent
      ],
      providers:[
        KoszykComponent,
        { provide: KoszykService, useClass: MockKoszykService }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(KoszykComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


});
