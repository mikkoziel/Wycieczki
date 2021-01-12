import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';
import { MockAuthService } from './services/auth.service.mock';
import { WycieczkiServiceService } from './services/wycieczki-service.service';
import { MockWycieczkiServiceService } from './services/wycieczki-service.service.mock';
import { WycieczkiComponent } from './wycieczki.component';

describe('WycieczkiComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WycieczkiComponent
      ],
      providers: [
        WycieczkiComponent,
        { provide: AuthService, useClass: MockAuthService },
        { provide: WycieczkiServiceService, useClass: MockWycieczkiServiceService },
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(WycieczkiComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Projekt'`, () => {
    const fixture = TestBed.createComponent(WycieczkiComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Projekt');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(WycieczkiComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('Projekt app is running!');
  // });
});
