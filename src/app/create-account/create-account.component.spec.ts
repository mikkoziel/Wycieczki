import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { MockAuthService } from '../services/auth.service.mock';

import { CreateAccountComponent } from './create-account.component';

describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountComponent ],
      providers: [
        CreateAccountComponent,
      { provide: AuthService, useClass: MockAuthService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('contains register', () => {
    const register = fixture.debugElement.query(By.css('#register')).nativeElement;
    expect(register).toBeTruthy();
    });
    
  it('contains dialog', () => {
    const dialog = fixture.debugElement.query(By.css('#dialog')).nativeElement;
    expect(dialog).toBeTruthy();
    });
});
