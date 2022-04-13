import { TestBed } from '@angular/core/testing';

import { CompensationService } from './compensation.service';

describe('CompanyService', () => {
  let service: CompensationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompensationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
