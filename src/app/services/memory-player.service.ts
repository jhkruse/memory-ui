import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  Player,
  Players,
} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class MemoryPlayerService implements Players {
  private players: Player[];
  private currentPlayerId: number;

  constructor() {
    this.resetPlayers();
    this.currentPlayerId = 0;
  }

  public resetPlayers(): void {
    this.players = [];
    this.currentPlayerId = 0;
  }

  public removePlayer(id: number): void {
    this.players.splice(id, 1);
    this.nextPlayer();
  }

  public addPlayer(name: string): number {
    this.players.push({
      name,
      score: 0,
      active: false,
    });
    return this.players.length - 1;
  }

  public nextPlayer(): number {
    this.players[this.currentPlayerId].active = false;
    if (this.currentPlayerId === this.players.length - 1) {
      this.currentPlayerId = 0;
    } else {
      this.currentPlayerId++;
    }
    this.players[this.currentPlayerId].active = true;
    return this.currentPlayerId;
  }

  public incrementScore(id: number): number {
    this.players[id].score++;
    return this.players[id].score;
  }

  public getCurrentPlayerId(): number {
    return this.currentPlayerId;
  }

  public getPlayers(): Observable<Player[]> {
    return of(this.players);
  }
}
