/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MemoryBoardService } from './memory-board.service';

describe('Service: Board', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemoryBoardService]
    });
  });

  it('should ...', inject([MemoryBoardService], (service: MemoryBoardService) => {
    expect(service).toBeTruthy();
  }));
});
