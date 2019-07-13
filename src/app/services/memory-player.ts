import { Player } from './interfaces';

export class MemoryPlayer implements Player {
  name: string;
  score: number;
  active: boolean;

  constructor(name: string, active: boolean) {
    this.name = name;
    this.score = 0;
    this.active = active;
  }

  public setActive(): void {
    this.active = true;
  }

  public setInactive(): void {
    this.active = false;
  }

  public incrementScore(): void {
    this.score++;
  }

  public resetScore(): void {
    this.score = 0;
  }
}
