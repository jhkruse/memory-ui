import { Injectable } from '@angular/core';
import { MemoryPlayer } from './memory-player';
import { Observable, BehaviorSubject } from 'rxjs';
import { Player, Players } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MemoryPlayerService implements Players {
  private players: Player[];
  private playersSubject: BehaviorSubject<Player[]>;
  private currentPlayerId: number;

  constructor() {
    this.playersSubject = new BehaviorSubject<Player[]>([]);
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
    this.players.push(new MemoryPlayer(name, this.players.length ? false : true));
    this.playersSubject.next(this.players);
    return this.players.length - 1;
  }

  public nextPlayer(): number {
    this.players[this.currentPlayerId].setInactive();
    if (this.currentPlayerId === this.players.length - 1) {
      this.currentPlayerId = 0;
    } else {
      this.currentPlayerId++;
    }
    this.players[this.currentPlayerId].setActive();
    this.playersSubject.next(this.players);
    return this.currentPlayerId;
  }

  public incrementScore(playerId: number): number {
    this.players[playerId].score++;
    this.playersSubject.next(this.players);
    return this.players[playerId].score;
  }

  public resetScore(): void {
    this.players.forEach(player => {
      player.resetScore();
    });
    this.playersSubject.next(this.players);
  }

  public getCurrentPlayerId(): number {
    return this.currentPlayerId;
  }

  public getPlayers(): Observable<Player[]> {
    return this.playersSubject;
  }

  public getWinner(): Player[] {
    const maxScore = Math.max.apply(Math, this.players.map(player => player.score));
    return this.players.filter(player => player.score === maxScore);
  }
}
