import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Game,
  Player,
  Players,
  Card,
  Cards,
} from './interfaces';
import { MemoryPlayerService } from './memory-player.service';
import { MemoryCardService } from './memory-card.service';

@Injectable({
  providedIn: 'root'
})
export class MemoryGameLocalService implements Game, Players, Cards {
  constructor(
    private memoryPlayerService: MemoryPlayerService,
    private memoryCardService: MemoryCardService,
  ) { }

  public init(): void {
    throw new Error('Method not implemented.');
  }

  public reset(): void {
    this.resetPlayers();
    this.shuffleCards();
  }

  public quit(): void {
    throw new Error('Method not implemented.');
  }

  public resetPlayers(): void {
    this.memoryPlayerService.resetPlayers();
  }

  public removePlayer(id: number): void {
    this.memoryPlayerService.removePlayer(id);
  }

  public addPlayer(name: string): number {
    return this.memoryPlayerService.addPlayer(name);
  }

  public nextPlayer(): number {
    return this.memoryPlayerService.nextPlayer();
  }

  public incrementScore(playerId: number): number {
    return this.memoryPlayerService.incrementScore(playerId);
  }

  public getCurrentPlayerId(): number {
    return this.memoryPlayerService.getCurrentPlayerId();
  }

  public getPlayers(): Observable<Player[]> {
    return this.memoryPlayerService.getPlayers();
  }

  public initCards(amount: number, imageSize: number): void {
    this.memoryCardService.initCards(amount, imageSize);
  }

  public isPair(pairId: string): boolean {
    return this.memoryCardService.isPair(pairId);
  }

  public shuffleCards(): void {
    this.memoryCardService.shuffleCards();
  }

  public removeCards(pairId: string): void {
    this.memoryCardService.removeCards(pairId);
  }

  public coverCards(): void {
    this.memoryCardService.coverCards();
  }

  public uncoverCard(index: number): number {
    return this.memoryCardService.uncoverCard(index);
  }

  public getCards(): Observable<Card[]> {
    return this.memoryCardService.getCards();
  }
}
