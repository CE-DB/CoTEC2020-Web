import { TestBed } from '@angular/core/testing';

import { SharedhubdataService } from './sharedhubdata.service';

describe('SharedhubdataService', () => {
  let service: SharedhubdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedhubdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
