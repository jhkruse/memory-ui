import { Card } from './interfaces';

export class MemoryCard implements Card {
  pairId: string;
  url: string;
  uncovered: boolean;
  removed: boolean;

  constructor(imageUrl: string) {
    this.pairId = imageUrl;
    this.url = imageUrl;
    this.uncovered = false;
    this.removed = false;
  }

  public uncover(): void {
    this.uncovered = true;
  }

  public cover(): void {
    this.uncovered = false;
  }

  public remove(): void {
    this.removed = true;
  }
}
