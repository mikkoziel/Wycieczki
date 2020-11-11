import { TestBed } from '@angular/core/testing';

import { WycieczkiServiceService } from './wycieczki-service.service';

describe('WycieczkiServiceService', () => {
  let service: WycieczkiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WycieczkiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
