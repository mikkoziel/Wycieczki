import { TestBed } from '@angular/core/testing';

import { KoszykService } from './koszyk.service';

describe('CartService', () => {
  let service: KoszykService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KoszykService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
