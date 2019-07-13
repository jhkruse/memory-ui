import { TestBed } from '@angular/core/testing';

import { MemoryCardService } from './memory-card.service';

describe('MemoryCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemoryCardService = TestBed.get(MemoryCardService);
    expect(service).toBeTruthy();
  });
});
