import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import uuidV4 from 'uuid/V4';
import { Game, Player, Card } from '../interfaces';
import { MemoryPlayerService } from '../player-service/memory-player.service';
import { MemoryCardService } from '../memory-card-service/memory-card.service';
import { MemoryBoardService } from '../memory-board-service/memory-board.service';
import { Router } from '@angular/router';
import { PlayerSocketClient } from './player-socket-client';
import { PlayerModel, CardModel, SessionMessage } from '../../../client/interfaces';
import { MemoryCard } from '../memory-card-service/memory-card';

@Injectable({
  providedIn: 'root'
})
export class MemoryGameService implements Game {
  private gameOverSubject: Subject<boolean | Player[]>;
  private cardPairs: number;
  private imageSize: number;
  private network: boolean | string;
  private networkPlayerId: string;
  private networkSessionName: string;
  private networkSessionId: string;
  private socketClient: PlayerSocketClient;

  constructor(
    private memoryPlayerService: MemoryPlayerService,
    private memoryCardService: MemoryCardService,
    private memoryBoardService: MemoryBoardService,
    private router: Router
  ) {
    this.gameOverSubject = new Subject<boolean | Player[]>();
    this.cardPairs = 0;
    this.imageSize = 200;
    this.network = false;
  }

  public initLocal(cardPairs: number, imageSize: number, playerNames: string[]): void {
    this.cardPairs = cardPairs;
    this.imageSize = imageSize;

    this.resetPlayers();
    this.initCards(this.cardPairs, this.imageSize);

    playerNames.forEach(playerName => {
      this.addPlayer(playerName);
    });
  }

  public scanNetwork(socketUrl: string) {
    // this.networkPlayerId = uuidV4();
    this.socketClient = new PlayerSocketClient(this, {
      playerNetworkId: '-1',
      playerIndex: -1,
      socketUrl
    });
  }

  public joinNetwork(session: SessionMessage, playerName: string) {
    this.network = 'join';
    this.networkPlayerId = uuidV4();
    this.networkSessionId = session.id;
    this.socketClient.setPlayerIndex(session.players.length);
    this.socketClient.setPlayerNetworkId(this.networkPlayerId);
    console.log(`JOINING PLAYER ${this.socketClient.getPlayerIndex() + 1} on session ${JSON.stringify(session)}`);
    console.log(`PLAYER ${this.socketClient.getPlayerIndex() + 1} network ID: ${this.networkPlayerId}`);

    const newPlayer: PlayerModel = {
      networkId: this.networkPlayerId,
      name: playerName,
      score: 0,
      active: false
    };

    const players: PlayerModel[] = session.players.slice();
    players.push(newPlayer);
    this.socketClient.joinGame(session.id, this.socketClient.getPlayerIndex(), players);

    this.getPlayers().subscribe(
      (data: Player[]) => {
        console.log('PLAYERS SUBSCRIBE TRIGGERED =============== ');
        const players: PlayerModel[] = data.map(player => ({
          networkId: this.networkPlayerId,
          name: player.name,
          score: player.score,
          active: player.active
        }));
        if (players.length && players[this.socketClient.getPlayerIndex()].active) {
          this.socketClient.updatePlayers(session.id, this.socketClient.getPlayerIndex(), players);
        }
      },
      err => console.log('ERROR getting players: ', err)
    );

    // this.getCards().subscribe(
    //   (data: Card[]) => {
    //     const cards: CardModel[] = data.map((card) => ({
    //       pairId: card.pairId,
    //       url: card.url,
    //       uncovered: card.uncovered,
    //       removed: card.removed,
    //     }));
    //     if (cards.length && this.socketClient.getPlayerIndex()) {
    //       this.socketClient.updateCards(session.id, this.socketClient.getPlayerIndex(), cards);
    //     }
    //   },
    //   err => console.log('ERROR getting cards: ', err)
    // );

    players.forEach(player => this.addPlayer(player.name));

    const cardsModel: CardModel[] = session.cards.slice();
    const cards: Card[] = cardsModel.map(cardModel => {
      const card = new MemoryCard(cardModel.url);
      card.uncovered = cardModel.uncovered;
      card.removed = cardModel.removed;
      return card;
    });
    console.log(`CARDS from session: ${JSON.stringify(cards)}`);
    this.createCards(cards);
  }

  public initNetwork(
    cardPairs: number,
    imageSize: number,
    playerName: string,
    networkSessionName: string,
    socketUrl: string
  ): void {
    this.network = 'create';
    this.networkPlayerId = uuidV4();
    this.cardPairs = cardPairs;
    this.imageSize = imageSize;
    this.networkSessionName = networkSessionName;

    this.resetPlayers();

    this.socketClient = new PlayerSocketClient(this, {
      playerNetworkId: this.networkPlayerId,
      playerIndex: 0,
      socketUrl
    });

    console.log(`STARTING PLAYER ${this.socketClient.getPlayerIndex() + 1}`);

    const session = this.socketClient.startGame(this.networkSessionName, {
      networkId: this.networkPlayerId,
      name: playerName,
      score: 0,
      active: true
    });
    this.networkSessionId = session.id;

    this.getPlayers().subscribe(
      (data: Player[]) => {
        console.log('PLAYERS SUBSCRIBE TRIGGERED =============== ', JSON.stringify(data, null, 2));
        const players: PlayerModel[] = data.map(player => ({
          networkId: player.networkId,
          name: player.name,
          score: player.score,
          active: player.active
        }));
        if (players.length) {
          this.socketClient.updatePlayers(this.networkSessionId, this.socketClient.getPlayerIndex(), players);
        }
      },
      err => console.log('ERROR getting players: ', err)
    );

    this.getCards().subscribe(
      (data: Card[]) => {
        const cards: CardModel[] = data.map(card => ({
          pairId: card.pairId,
          url: card.url,
          uncovered: card.uncovered,
          removed: card.removed
        }));
        if (cards.length) {
          this.socketClient.updateCards(this.networkSessionId, this.socketClient.getPlayerIndex(), cards);
        }
      },
      err => console.log('ERROR getting cards: ', err)
    );

    this.addPlayer(playerName, this.networkPlayerId);
    this.initCards(this.cardPairs, this.imageSize);
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
    this.initCards(this.cardPairs, this.imageSize);
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

  public addPlayer(name: string, networkId?: string): number {
    return this.memoryPlayerService.addPlayer(name, networkId);
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

  public createCards(cards: Card[]): void {
    this.memoryCardService.createCards(cards);
  }

  public createPlayers(players: Player[]): void {
    this.memoryPlayerService.createPlayers(players);
  }

  public getCards(): Observable<Card[]> {
    return this.memoryCardService.getCards();
  }

  public getNetworkSessions(): Observable<SessionMessage[]> {
    return this.socketClient.getSessions();
  }

  public getNetworkSessionId(): string {
    return this.networkSessionId;
  }

  public getCardsSnapshot(): Card[] {
    return this.memoryCardService.getCardsSnapshot();
  }

  public toggleIsLockedBoard(): void {
    return this.memoryBoardService.toggleIsLockedBoard();
  }
}
