import { TestBed, inject } from '@angular/core/testing';

import { MarkService } from './mark.service';

describe('MarkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkService]
    });
  });

  it('should be created', inject([MarkService], (service: MarkService) => {
    expect(service).toBeTruthy();
  }));
});
