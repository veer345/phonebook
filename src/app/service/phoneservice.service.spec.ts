import { TestBed } from '@angular/core/testing';

import { PhoneserviceService } from './phoneservice.service';

describe('PhoneserviceService', () => {
  let service: PhoneserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
