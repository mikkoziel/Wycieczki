import { TestBed } from '@angular/core/testing';
import { KoszykComponent } from './koszyk.component';

describe('WycieczkiComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        KoszykComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(KoszykComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Projekt'`, () => {
    const fixture = TestBed.createComponent(KoszykComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Projekt');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(KoszykComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('Projekt app is running!');
  });
});
