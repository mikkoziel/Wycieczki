import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AuthService } from './auth.service';
import { DbService } from './db.service';
import { MockDbService } from './db.service.mock';

const uid = 'D5zHOxFtQ8fXfnIeqBQZlTKw34y2'
  // An anonymous user
  const authState = {
    displayName: null,
    isAnonymous: true,
    uid: uid
  };

  const mockAngularFireAuth: any = {
    auth: jasmine.createSpyObj('auth', 
      {
      'signOut': function(){}
      }
    ),
    authState: of(authState),
    signOut: function(){}
  };

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers:[
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: AuthService, useClass: AuthService },
        { provide: DbService, useClass: MockDbService }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should checkAdmin ', () => {
    expect(service).toBeTruthy();
    service.checkAdmin(uid)
  });
  
  it('should logout ', () => {
    expect(service).toBeTruthy();
    service.logout()
  });

});
