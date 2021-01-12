import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AdminPanelComponent } from './admin-panel.component';

describe('AdminPanelComponent', () => {
  let component: AdminPanelComponent;
  let fixture: ComponentFixture<AdminPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   
  it('contains h2', () => {
    const h2 = fixture.debugElement.query(By.css('#h2')).nativeElement;
    expect(h2).toBeTruthy();
    });
    
  it('contains create_p', () => {
    const create_p = fixture.debugElement.query(By.css('#create_p')).nativeElement;
    expect(create_p).toBeTruthy();
    });
    
  it('contains bttn-new', () => {
    const bttn_new = fixture.debugElement.query(By.css('#bttn-new')).nativeElement;
    expect(bttn_new).toBeTruthy();
    });
    
  it('contains update', () => {
    const update = fixture.debugElement.query(By.css('#update')).nativeElement;
    expect(update).toBeTruthy();
    });
    
  it('contains bttn-nhomeew', () => {
    const home = fixture.debugElement.query(By.css('#bttn-home')).nativeElement;
    expect(home).toBeTruthy();
    });
    
});
