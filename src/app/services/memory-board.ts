import { Board } from './interfaces';

export class MemoryBoard implements Board {
  isLocked: boolean;

  constructor() {
    this.isLocked = false;
  }

  public toggleIsLocked(): void {
    this.isLocked = !this.isLocked;
  }
}
