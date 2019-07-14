import { TestBed } from '@angular/core/testing';

import { MemoryGameService } from './memory-game.service';

describe('MemoryGameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemoryGameService = TestBed.get(MemoryGameService);
    expect(service).toBeTruthy();
  });
});
