import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
} from 'rxjs';
import {
  Player,
  Players,
} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class MemoryPlayerService implements Players {
  private players: Player[];
  private playersSubject: Subject<Player[]>;
  private currentPlayerId: number;

  constructor() {
    this.playersSubject = new Subject<Player[]>();
    this.resetPlayers();
    this.currentPlayerId = 0;
  }

  public resetPlayers(): void {
    this.players = [];
    this.currentPlayerId = 0;
    this.playersSubject.next(this.players);
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
    this.playersSubject.next(this.players);
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
    this.playersSubject.next(this.players);
    return this.currentPlayerId;
  }

  public incrementScore(id: number): number {
    this.players[id].score++;
    this.playersSubject.next(this.players);
    return this.players[id].score;
  }

  public getCurrentPlayerId(): number {
    return this.currentPlayerId;
  }

  public getPlayers(): Observable<Player[]> {
    return this.playersSubject;
  }
}