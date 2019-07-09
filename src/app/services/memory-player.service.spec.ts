import { TestBed } from '@angular/core/testing';

import { MemoryPlayerService } from './memory-player.service';

describe('PlayersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemoryPlayerService = TestBed.get(MemoryPlayerService);
    expect(service).toBeTruthy();
  });
});
