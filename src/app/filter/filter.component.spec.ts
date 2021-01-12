import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { WycieczkiServiceService } from '../services/wycieczki-service.service';
import { MockWycieczkiServiceService } from '../services/wycieczki-service.service.mock';

import { FilterComponent } from './filter.component';

class MockRouter {
 // Router
 public events = of( new NavigationEnd(0, 'http://localhost:4200/login', 'http://localhost:4200/login'));
}

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // imports: [RouterTestingModule],
      declarations: [ FilterComponent ],
      providers:[
        FilterComponent,
        { provide: WycieczkiServiceService, useClass: MockWycieczkiServiceService },
        {provide: Router, useClass: MockRouter}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get( Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
