import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Game, Player, Players, Card, Cards } from './interfaces';
import { MemoryPlayerService } from './memory-player.service';
import { MemoryCardService } from './memory-card.service';
import { MemoryBoardService } from './memory-board.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MemoryGameLocalService implements Game {
  private gameOverSubject: Subject<boolean | Player[]>;

  constructor(
    private memoryPlayerService: MemoryPlayerService,
    private memoryCardService: MemoryCardService,
    private memoryBoardService: MemoryBoardService,
    private router: Router
  ) {
    this.gameOverSubject = new Subject<boolean | Player[]>();
  }

  public init(): void {
    throw new Error('Method not implemented.');
  }

  public updateGame(card: Card, index: number): void {
    this.toggleIsLockedBoard();
    const amountOfUncoveredCards = this.uncoverCard(index);

    if (amountOfUncoveredCards > 1) {
      if (this.isPair(card.pairId)) {
        setTimeout(() => {
          this.removeCards(card.pairId);
          this.incrementScore(this.getCurrentPlayerId());
          this.toggleIsLockedBoard();
          console.log(this.isGameOver());
        }, 3000);
      } else {
        setTimeout(() => {
          this.coverCards();
          this.nextPlayer();
          this.toggleIsLockedBoard();
        }, 3000);
      }
    } else {
      this.toggleIsLockedBoard();
    }
  }

  public isGameOver(): void {
    const cards = this.getCardsSnapshot();
    const isGameOver = cards.filter(card => card.removed).length === cards.length;
    this.gameOverSubject.next(isGameOver ? this.getWinner() : false);
  }

  public getGameOver(): Observable<boolean | Player[]> {
    return this.gameOverSubject;
  }

  public getWinner(): Player[] {
    return this.memoryPlayerService.getWinner();
  }

  public reset(): void {
    this.resetScore();
  }

  public quit(): void {
    this.router.navigateByUrl('');
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

  public resetScore(): void {
    this.memoryPlayerService.resetScore();
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

  public getCardsSnapshot(): Array<Card> {
    return this.memoryCardService.getCardsSnapshot();
  }

  public toggleIsLockedBoard(): void {
    return this.memoryBoardService.toggleIsLockedBoard();
  }
}
