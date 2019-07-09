import { TestBed } from '@angular/core/testing';

import { MemoryGameLocalService } from './memory-game-local.service';

describe('MemoryGameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemoryGameLocalService = TestBed.get(MemoryGameLocalService);
    expect(service).toBeTruthy();
  });
});
