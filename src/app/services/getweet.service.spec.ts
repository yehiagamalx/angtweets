import { TestBed } from '@angular/core/testing';

import { GetweetService } from './getweet.service';

describe('GetweetService', () => {
  let service: GetweetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetweetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
